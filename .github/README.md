# GitHub Actions Workflows

This directory contains the CI/CD workflow for raabarna.se.

## Workflow

### deploy.yml
**Triggers:** Push to `dev` or `main` branch

**Single workflow with conditional jobs based on branch.**

---

### DEV Branch Flow (auto-deploy):
1. Build application
2. Run tests/linting
3. Deploy to dev.raabarna.se
4. Health check
5. Auto-rollback if health check fails

**No manual approvals required** - deploys automatically.

---

### MAIN Branch Flow (staged deployment):
1. Build application
2. Run tests/linting
3. Deploy to dev.raabarna.se (staging) - **auto-deploy, no approval**
4. Health check dev - **auto-rollback if fails**
5. **[APPROVAL REQUIRED]** Verify changes on dev.raabarna.se
6. Deploy to raabarna.se (production)
7. Health check prod - **auto-rollback if fails**
8. **[APPROVAL REQUIRED]** Verify changes on raabarna.se
9. **[APPROVAL REQUIRED]** Cleanup old releases

**2 manual approval gates** - before production deployment and before cleanup.

---

## How It Works

The single workflow uses conditional logic (`if: github.ref == 'refs/heads/main'`) to:
- Run all jobs for `dev` branch (but skip approval gates)
- Run all jobs for `main` branch (including approval gates and prod deployment)

This eliminates code duplication while maintaining separate flows.

---

## Configuration

### Environments Required

Configure these in GitHub Settings → Environments:

- `dev` - No reviewers (auto-deploy for both dev and main branches)
- `production-approval` - Requires 1 reviewer (approval before prod deployment)
- `production` - Requires 1 reviewer (additional safety gate)
- `cleanup-approval` - Requires 1 reviewer (approval before cleanup)

**Total:** 4 environments (1 without protection, 3 with required reviewers)

### Self-Hosted Runner

Workflows run on `self-hosted` runner. Ensure the GitHub Actions runner is:
- Installed on your Ubuntu server
- Running as service under user `wille`
- Connected to this repository

---

## Scripts

Workflows use the following scripts from `/scripts`:

- `deploy.sh` - Manages symlink-based deployments
- `health-check.sh` - Validates deployment (HTTP 200 + title check)
- `rollback.sh` - Automatic rollback on failure
- `cleanup.sh` - Removes old releases (keeps last 5)

---

## Documentation

See [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md) for complete setup instructions.
