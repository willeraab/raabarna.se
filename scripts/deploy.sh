#!/bin/bash

################################################################################
# Deploy Script - Symlink-based Blue-Green Deployment
#
# This script performs zero-downtime deployments by managing symlinks.
# It maintains 'current' and 'previous' symlinks for rollback capability.
#
# Usage: deploy.sh <release_dir> <environment> <url> <deploy_user>
#   release_dir: Full path to the new release directory
#   environment: Either 'dev' or 'prod'
#   url: The URL for the environment (used for logging)
#   deploy_user: Username for file ownership (optional, defaults to current user)
#
# Example:
#   deploy.sh /var/www/raabarna.se/releases/dev/release-1730000001 dev https://dev.raabarna.se wille
################################################################################

set -e  # Exit on any error
set -u  # Exit on undefined variable

# Input parameters
RELEASE_DIR="${1}"
ENVIRONMENT="${2}"
URL="${3}"
DEPLOY_USER="${4:-${USER}}"  # Use provided user or fallback to current user

# Base directories
BASE_DIR="/var/www/raabarna.se"
RELEASES_DIR="${BASE_DIR}/releases/${ENVIRONMENT}"
CURRENT_SYMLINK="${BASE_DIR}/current-${ENVIRONMENT}"
PREVIOUS_SYMLINK="${BASE_DIR}/previous-${ENVIRONMENT}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

################################################################################
# Functions
################################################################################

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

validate_environment() {
    if [[ "${ENVIRONMENT}" != "dev" && "${ENVIRONMENT}" != "prod" ]]; then
        log_error "Environment must be 'dev' or 'prod', got: ${ENVIRONMENT}"
        exit 1
    fi
}

validate_release_dir() {
    if [[ ! -d "${RELEASE_DIR}" ]]; then
        log_error "Release directory does not exist: ${RELEASE_DIR}"
        exit 1
    fi

    # Check if release directory contains built files
    if [[ ! -f "${RELEASE_DIR}/index.html" ]]; then
        log_error "Release directory does not contain index.html: ${RELEASE_DIR}"
        exit 1
    fi
}

backup_current_as_previous() {
    # If current symlink exists, back it up as previous
    if [[ -L "${CURRENT_SYMLINK}" ]]; then
        local current_target
        current_target=$(readlink "${CURRENT_SYMLINK}")

        log_info "Backing up current release as previous"
        log_info "  Current: ${current_target}"

        # Remove old previous symlink if it exists
        if [[ -L "${PREVIOUS_SYMLINK}" ]]; then
            rm "${PREVIOUS_SYMLINK}"
        fi

        # Create new previous symlink pointing to current
        ln -s "${current_target}" "${PREVIOUS_SYMLINK}"
        log_info "  Previous symlink updated"
    else
        log_warning "No current deployment found, this appears to be the first deployment"
    fi
}

update_current_symlink() {
    log_info "Updating current symlink to new release"
    log_info "  New release: ${RELEASE_DIR}"

    # Create temporary symlink
    local temp_symlink="${CURRENT_SYMLINK}.tmp"
    ln -s "${RELEASE_DIR}" "${temp_symlink}"

    # Atomic swap of symlinks
    mv -T "${temp_symlink}" "${CURRENT_SYMLINK}"

    log_info "  Current symlink updated (atomic swap completed)"
}

set_permissions() {
    log_info "Setting proper permissions on release directory"

    # Set ownership to deploy user:www-data
    chown -R "${DEPLOY_USER}:www-data" "${RELEASE_DIR}"

    # Set directory permissions: rwxr-xr-x
    find "${RELEASE_DIR}" -type d -exec chmod 755 {} \;

    # Set file permissions: rw-r--r--
    find "${RELEASE_DIR}" -type f -exec chmod 644 {} \;

    log_info "  Permissions set (owner: ${DEPLOY_USER}, group: www-data)"
}

################################################################################
# Main Deployment Process
################################################################################

log_info "==================================================================="
log_info "Starting deployment to ${ENVIRONMENT} environment"
log_info "==================================================================="
log_info "URL: ${URL}"
log_info "Release: ${RELEASE_DIR}"
log_info ""

# Step 1: Validate inputs
log_info "Step 1: Validating inputs..."
validate_environment
validate_release_dir
log_info "  Validation passed"
log_info ""

# Step 2: Set permissions
log_info "Step 2: Setting permissions..."
set_permissions
log_info ""

# Step 3: Backup current deployment
log_info "Step 3: Backing up current deployment..."
backup_current_as_previous
log_info ""

# Step 4: Update current symlink (DEPLOYMENT HAPPENS HERE)
log_info "Step 4: Deploying new release..."
update_current_symlink
log_info ""

# Step 5: Verify symlinks
log_info "Step 5: Verifying symlinks..."
if [[ -L "${CURRENT_SYMLINK}" ]]; then
    current_target=$(readlink "${CURRENT_SYMLINK}")
    log_info "  Current -> ${current_target}"
fi
if [[ -L "${PREVIOUS_SYMLINK}" ]]; then
    previous_target=$(readlink "${PREVIOUS_SYMLINK}")
    log_info "  Previous -> ${previous_target}"
fi
log_info ""

log_info "==================================================================="
log_info "Deployment completed successfully!"
log_info "==================================================================="
log_info "Environment: ${ENVIRONMENT}"
log_info "URL: ${URL}"
log_info "Release: ${RELEASE_DIR}"
log_info ""
log_info "Next step: Health check will verify the deployment"
log_info "If health check fails, automatic rollback will be triggered"
log_info "==================================================================="

exit 0
