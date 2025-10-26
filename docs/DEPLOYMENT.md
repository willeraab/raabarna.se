# Deployment Guide - raabarna.se

Complete guide for setting up and using the CI/CD pipeline with zero-downtime blue-green deployments.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Server Setup](#server-setup)
5. [GitHub Configuration](#github-configuration)
6. [Nginx Configuration](#nginx-configuration)
7. [SSL Configuration](#ssl-configuration)
8. [Testing the Pipeline](#testing-the-pipeline)
9. [Deployment Workflows](#deployment-workflows)
10. [Troubleshooting](#troubleshooting)
11. [Rollback Procedures](#rollback-procedures)

---

## Overview

This CI/CD pipeline provides:

- **Automated deployments** on git push
- **Zero-downtime deployments** using symlink-based blue-green strategy
- **Automatic rollback** if health checks fail
- **Staged deployments** (dev → prod with approval gates)
- **Health validation** (HTTP 200 + title tag verification)
- **Automatic cleanup** of old releases

### Deployment Flows

**DEV Branch (dev.raabarna.se):**
```
Push to dev → Build → Test → Deploy to dev → Health Check → ✓ Live
                                                          ↓ (on fail)
                                                      Auto Rollback
```

**MAIN Branch (raabarna.se via dev staging):**
```
Push to main → Build → Test → Deploy to dev → Health Check
                                                          ↓ (on fail)
                                                      Auto Rollback
                                    ↓ (auto-continues, no approval)
                                   Approval Gate (verify dev)
                                            ↓
                              Deploy to prod → Health Check
                                                          ↓ (on fail)
                                                      Auto Rollback
                                    ↓ (after approval)
                                   Approval Gate (verify prod)
                                            ↓
                                  Cleanup Old Releases
```

---

## Architecture

### Directory Structure on Server

```
/var/www/raabarna.se/
├── releases/
│   ├── dev/
│   │   ├── release-1730000001/    # Timestamped releases
│   │   ├── release-1730000002/
│   │   └── release-1730000003/
│   └── prod/
│       ├── release-1730000001/
│       ├── release-1730000002/
│       └── release-1730000003/
├── current-dev -> releases/dev/release-1730000003      # Active dev release
├── current-prod -> releases/prod/release-1730000003    # Active prod release
├── previous-dev -> releases/dev/release-1730000002     # For rollback
└── previous-prod -> releases/prod/release-1730000002   # For rollback
```

### How Symlinks Work

1. **New deployment creates** a new release directory (e.g., `release-1730000004`)
2. **Previous symlink** is updated to point to current release (backup)
3. **Current symlink** is atomically updated to point to new release
4. **Nginx serves** files from the `current-*` symlink
5. **On failure**, current symlink is reverted to previous

This allows instant rollbacks and zero-downtime deployments.

---

## Prerequisites

Before starting, ensure you have:

- Ubuntu server with nginx installed
- Root or sudo access to the server
- GitHub repository at `https://github.com/willeraab/raabarna.se.git`
- User `wille` exists on the server
- Node.js 20+ and yarn installed on server (for the GitHub Actions runner)

---

## Server Setup

### Step 1: Create Directory Structure

SSH into your server and run:

```bash
# Create the base directory structure
sudo mkdir -p /var/www/raabarna.se/releases/{dev,prod}

# Set ownership to wille
sudo chown -R wille:www-data /var/www/raabarna.se

# Set proper permissions
sudo chmod -R 755 /var/www/raabarna.se
```

### Step 2: Install GitHub Actions Self-Hosted Runner

1. **Navigate to GitHub Settings:**
   - Go to your repository: `https://github.com/willeraab/raabarna.se`
   - Click **Settings** → **Actions** → **Runners**
   - Click **New self-hosted runner**

2. **Follow GitHub's instructions to download and configure the runner:**

```bash
# Create a directory for the runner
mkdir -p ~/actions-runner && cd ~/actions-runner

# Download the latest runner package (check GitHub for the latest version)
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extract the installer
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configure the runner
./config.sh --url https://github.com/willeraab/raabarna.se --token YOUR_TOKEN_FROM_GITHUB

# When prompted:
# - Runner name: ubuntu-raabarna-runner (or your choice)
# - Runner group: Default
# - Work folder: _work
```

3. **Install the runner as a service:**

```bash
# Install the service
sudo ./svc.sh install wille

# Start the service
sudo ./svc.sh start

# Check status
sudo ./svc.sh status
```

4. **Verify the runner:**
   - Go back to GitHub Settings → Actions → Runners
   - You should see your runner with a green "Idle" status

### Step 3: Make Scripts Executable

On the server, after you've pushed the scripts to GitHub and the runner has pulled them:

```bash
# Navigate to the repository on the runner
cd ~/actions-runner/_work/raabarna.se/raabarna.se

# Make scripts executable
chmod +x scripts/*.sh
```

**Note:** The scripts will be in the runner's work directory after the first workflow run. Alternatively, you can create them manually on the server.

---

## GitHub Configuration

### Step 1: Create GitHub Environments

GitHub Environments allow manual approval gates. The single workflow uses conditional logic to apply different environments based on the branch.

1. **Go to Repository Settings:**
   - Navigate to `https://github.com/willeraab/raabarna.se/settings/environments`

2. **Create the following environments:**

#### Environment: `dev`
- **Purpose:** Auto-deployment to dev.raabarna.se for both dev and main branches
- **Protection Rules:**
  - ❌ No protection rules (auto-deploy)
- **Environment URL:** `https://dev.raabarna.se`

#### Environment: `production-approval`
- **Purpose:** Approval gate before deploying to production (main branch only)
- **Protection Rules:**
  - ✅ Required reviewers: 1 reviewer (yourself)
  - Add yourself as a reviewer

#### Environment: `production`
- **Purpose:** Production deployment to raabarna.se (main branch only)
- **Protection Rules:**
  - ✅ Required reviewers: 1 reviewer (yourself)
  - Add yourself as a reviewer
- **Environment URL:** `https://raabarna.se`

#### Environment: `cleanup-approval`
- **Purpose:** Approval gate before cleaning up old releases (main branch only)
- **Protection Rules:**
  - ✅ Required reviewers: 1 reviewer (yourself)
  - Add yourself as a reviewer

**Total:** 4 environments (1 without protection for dev auto-deploy, 3 with required reviewers)

---

## Nginx Configuration

### Step 1: Create Nginx Configuration for dev.raabarna.se

Create a new nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/dev.raabarna.se
```

Add the following configuration:

```nginx
# Development site - dev.raabarna.se
server {
    listen 80;
    listen [::]:80;
    server_name dev.raabarna.se;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name dev.raabarna.se;

    # SSL certificates (will be configured by certbot)
    ssl_certificate /etc/letsencrypt/live/dev.raabarna.se/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dev.raabarna.se/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Root directory points to symlink
    root /var/www/raabarna.se/current-dev;
    index index.html;

    # Logs
    access_log /var/log/nginx/dev.raabarna.se.access.log;
    error_log /var/log/nginx/dev.raabarna.se.error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # React Router support - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Disable access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### Step 2: Update Nginx Configuration for raabarna.se

Update your existing production configuration to use the symlink:

```bash
sudo nano /etc/nginx/sites-available/raabarna.se
```

Update or create with the following configuration:

```nginx
# Production site - raabarna.se
server {
    listen 80;
    listen [::]:80;
    server_name raabarna.se www.raabarna.se;

    # Redirect HTTP to HTTPS
    return 301 https://raabarna.se$request_uri;
}

# Redirect www to non-www
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.raabarna.se;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/raabarna.se/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/raabarna.se/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://raabarna.se$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name raabarna.se;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/raabarna.se/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/raabarna.se/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Root directory points to symlink
    root /var/www/raabarna.se/current-prod;
    index index.html;

    # Logs
    access_log /var/log/nginx/raabarna.se.access.log;
    error_log /var/log/nginx/raabarna.se.error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # React Router support - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Disable access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### Step 3: Enable the Sites

```bash
# Enable dev site
sudo ln -s /etc/nginx/sites-available/dev.raabarna.se /etc/nginx/sites-enabled/

# Enable prod site (if not already enabled)
sudo ln -s /etc/nginx/sites-available/raabarna.se /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

---

## SSL Configuration

### Step 1: Configure DNS

Before obtaining SSL certificates, ensure your DNS is configured:

1. **Add A record for dev.raabarna.se:**
   - Go to your DNS provider
   - Add an A record: `dev.raabarna.se` → `YOUR_SERVER_IP`
   - Wait for DNS propagation (use `dig dev.raabarna.se` to check)

### Step 2: Obtain SSL Certificate for dev.raabarna.se

```bash
# Install certbot if not already installed
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate for dev.raabarna.se
sudo certbot --nginx -d dev.raabarna.se

# Follow the prompts:
# - Enter your email address
# - Agree to terms of service
# - Choose whether to redirect HTTP to HTTPS (recommended: Yes)

# Verify auto-renewal is set up
sudo certbot renew --dry-run
```

### Step 3: Verify SSL Certificates

```bash
# Check dev certificate
sudo certbot certificates | grep dev.raabarna.se

# Check prod certificate
sudo certbot certificates | grep raabarna.se
```

Certbot will automatically renew certificates before they expire.

---

## Testing the Pipeline

### Step 1: Test Dev Deployment

1. **Create a test branch from dev:**

```bash
git checkout dev
git pull origin dev

# Make a small change (e.g., update a comment)
echo "<!-- Test deployment $(date) -->" >> index.html

git add index.html
git commit -m "test: verify dev deployment pipeline"
git push origin dev
```

2. **Monitor the deployment:**
   - Go to GitHub: Actions tab
   - Watch the "Deploy to Dev" workflow
   - Check each step completes successfully

3. **Verify the deployment:**
   - Visit `https://dev.raabarna.se`
   - Verify the site is working
   - Check deployment summary in GitHub Actions

### Step 2: Test Production Deployment

1. **Merge to main:**

```bash
git checkout main
git pull origin main
git merge dev
git push origin main
```

2. **Monitor the staged deployment:**
   - Go to GitHub: Actions tab
   - Watch the "Deploy to Production (via Dev)" workflow
   - Observe it deploys to dev first

3. **Approve dev staging:**
   - In the workflow, click "Review deployments"
   - Check "dev-staging"
   - Click "Approve and deploy"
   - Verify on `https://dev.raabarna.se`

4. **Approve production deployment:**
   - After dev verification, approve "production-approval"
   - The workflow deploys to prod
   - Verify on `https://raabarna.se`

5. **Approve cleanup:**
   - After prod verification, approve "cleanup-approval"
   - Old releases are removed

### Step 3: Test Rollback (Optional)

To test automatic rollback, you can temporarily break the health check:

1. **Temporarily modify health-check.sh** to expect a different title
2. **Push to dev**
3. **Watch the deployment fail and rollback automatically**
4. **Revert the health-check.sh change**

---

## Deployment Workflows

### Daily Development Workflow

**Working on features:**

```bash
# Work on dev branch
git checkout dev
git pull origin dev

# Make changes
# ... edit files ...

# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin dev

# Automatic deployment to dev.raabarna.se happens
# No approval needed - deploys immediately
```

### Production Release Workflow

**Deploying to production:**

```bash
# Ensure dev is tested and ready
git checkout dev
git pull origin dev

# Merge to main
git checkout main
git pull origin main
git merge dev
git push origin main

# Staged deployment process begins:
# 1. Builds and deploys to dev.raabarna.se
# 2. You get a notification to approve
# 3. After approval, deploys to raabarna.se
# 4. You approve again to clean up old releases
```

### Emergency Rollback

**If you need to manually rollback:**

```bash
# SSH to server
ssh wille@your-server

# Run rollback script
cd /var/www/raabarna.se
bash scripts/rollback.sh dev    # For dev
bash scripts/rollback.sh prod   # For production

# Verify
curl -I https://dev.raabarna.se
curl -I https://raabarna.se
```

---

## Troubleshooting

### Deployment Fails at Build Step

**Problem:** Build fails with errors

**Solution:**
```bash
# Test build locally
yarn install
yarn lint
yarn build

# Fix any errors, commit and push again
```

### Health Check Fails

**Problem:** Health check fails after deployment

**Possible causes:**
1. Site is not returning HTTP 200
2. Title tag is incorrect
3. Site is not accessible

**Debug:**
```bash
# SSH to server
ssh wille@your-server

# Test health check manually
bash /var/www/raabarna.se/scripts/health-check.sh https://dev.raabarna.se

# Check nginx logs
sudo tail -f /var/log/nginx/dev.raabarna.se.error.log

# Verify symlink
ls -la /var/www/raabarna.se/current-dev

# Check file permissions
ls -la /var/www/raabarna.se/current-dev/
```

### Symlink Not Working

**Problem:** Nginx returns 404 or shows old content

**Solution:**
```bash
# Verify symlinks exist and point to correct location
ls -la /var/www/raabarna.se/

# Manually update symlink if needed
ln -sfn /var/www/raabarna.se/releases/dev/release-TIMESTAMP /var/www/raabarna.se/current-dev

# Reload nginx
sudo systemctl reload nginx
```

### GitHub Actions Runner Offline

**Problem:** Runner shows offline in GitHub

**Solution:**
```bash
# SSH to server
ssh wille@your-server

# Check runner service status
cd ~/actions-runner
sudo ./svc.sh status

# Restart if needed
sudo ./svc.sh restart

# Check logs
cat ~/actions-runner/_diag/Runner_*.log
```

### Permission Denied Errors

**Problem:** Deployment fails with permission errors

**Solution:**
```bash
# Ensure wille owns the directory
sudo chown -R wille:www-data /var/www/raabarna.se

# Ensure proper permissions
sudo chmod -R 755 /var/www/raabarna.se

# Ensure nginx can read files
sudo usermod -a -G wille www-data
sudo systemctl restart nginx
```

### SSL Certificate Issues

**Problem:** SSL certificate errors or expired certificates

**Solution:**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates manually
sudo certbot renew

# If renewal fails, re-obtain certificate
sudo certbot --nginx -d dev.raabarna.se --force-renewal
sudo certbot --nginx -d raabarna.se --force-renewal

# Reload nginx
sudo systemctl reload nginx
```

---

## Rollback Procedures

### Automatic Rollback

Automatic rollback happens when:
- Health check fails after deployment
- The rollback script is triggered automatically
- Site reverts to previous working version

**No action needed** - the system handles this automatically.

### Manual Rollback

If you need to manually rollback to a specific release:

```bash
# SSH to server
ssh wille@your-server

# List available releases
ls -lt /var/www/raabarna.se/releases/dev/
ls -lt /var/www/raabarna.se/releases/prod/

# Manually update symlink to a specific release
ln -sfn /var/www/raabarna.se/releases/prod/release-1730000001 \
  /var/www/raabarna.se/current-prod

# Reload nginx (not strictly necessary but recommended)
sudo systemctl reload nginx

# Verify
curl -I https://raabarna.se
```

### Emergency "Break Glass" Procedure

If everything is broken and you need to quickly restore:

```bash
# SSH to server
ssh wille@your-server

# Use the previous symlink (automatic rollback target)
ln -sfn $(readlink /var/www/raabarna.se/previous-prod) \
  /var/www/raabarna.se/current-prod

# For dev:
ln -sfn $(readlink /var/www/raabarna.se/previous-dev) \
  /var/www/raabarna.se/current-dev

# Verify
curl -I https://raabarna.se
curl -I https://dev.raabarna.se
```

---

## Maintenance

### Viewing Deployment Logs

**GitHub Actions:**
- Go to repository → Actions tab
- Click on a workflow run to see detailed logs

**Server Logs:**
```bash
# Nginx access logs
sudo tail -f /var/log/nginx/raabarna.se.access.log
sudo tail -f /var/log/nginx/dev.raabarna.se.access.log

# Nginx error logs
sudo tail -f /var/log/nginx/raabarna.se.error.log
sudo tail -f /var/log/nginx/dev.raabarna.se.error.log

# GitHub Actions runner logs
tail -f ~/actions-runner/_diag/Runner_*.log
```

### Manual Cleanup

If you need to manually clean up old releases:

```bash
# SSH to server
ssh wille@your-server

# Run cleanup script
bash /var/www/raabarna.se/scripts/cleanup.sh dev 5
bash /var/www/raabarna.se/scripts/cleanup.sh prod 5

# Or manually delete specific releases
rm -rf /var/www/raabarna.se/releases/dev/release-TIMESTAMP
```

### Disk Space Monitoring

```bash
# Check disk usage of releases
du -sh /var/www/raabarna.se/releases/*

# Check total disk usage
df -h
```

---

## Security Considerations

1. **GitHub Secrets:** This setup doesn't require GitHub secrets since the runner is self-hosted on the same server

2. **File Permissions:**
   - Owner: `wille` (can write)
   - Group: `www-data` (can read)
   - Others: can read

3. **Nginx Security:**
   - SSL/TLS enabled
   - Security headers configured
   - Hidden files blocked

4. **Runner Security:**
   - Runner runs as user `wille`
   - Runner has write access only to `/var/www/raabarna.se`
   - Scripts validate inputs

---

## Summary

You now have a complete CI/CD pipeline with:

- ✅ Automated builds and tests
- ✅ Zero-downtime deployments
- ✅ Automatic rollback on failures
- ✅ Staged deployments (dev → prod)
- ✅ Manual approval gates for production
- ✅ Health validation
- ✅ Automatic cleanup

**Next Steps:**
1. Follow the setup instructions above
2. Test with a deployment to dev
3. Test with a deployment to prod
4. Configure monitoring/alerting if desired

**Support:**
- Check troubleshooting section above
- Review GitHub Actions logs
- Check server logs
- Test scripts manually on server

---

**Last Updated:** 2025-10-26
**Version:** 1.0.0
