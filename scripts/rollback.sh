#!/bin/bash

################################################################################
# Rollback Script
#
# Performs automatic rollback to the previous release by updating symlinks.
# This script is called when a health check fails after deployment.
#
# Usage: rollback.sh <environment>
#   environment: Either 'dev' or 'prod'
#
# Example:
#   rollback.sh dev
#   rollback.sh prod
################################################################################

set -e  # Exit on any error
set -u  # Exit on undefined variable

# Input parameters
ENVIRONMENT="${1}"

# Base directories
BASE_DIR="/var/www/raabarna.se"
CURRENT_SYMLINK="${BASE_DIR}/current-${ENVIRONMENT}"
PREVIOUS_SYMLINK="${BASE_DIR}/previous-${ENVIRONMENT}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

################################################################################
# Functions
################################################################################

log_info() {
    echo -e "${BLUE}[ROLLBACK]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[ROLLBACK]${NC} $1"
}

log_error() {
    echo -e "${RED}[ROLLBACK]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[ROLLBACK]${NC} $1"
}

validate_environment() {
    if [[ "${ENVIRONMENT}" != "dev" && "${ENVIRONMENT}" != "prod" ]]; then
        log_error "Environment must be 'dev' or 'prod', got: ${ENVIRONMENT}"
        exit 1
    fi
}

check_previous_exists() {
    if [[ ! -L "${PREVIOUS_SYMLINK}" ]]; then
        log_error "No previous release found to rollback to!"
        log_error "Previous symlink does not exist: ${PREVIOUS_SYMLINK}"
        log_error ""
        log_error "This might be the first deployment, or previous releases were removed."
        log_error "Manual intervention required."
        exit 1
    fi

    # Verify the previous symlink points to a valid directory
    local previous_target
    previous_target=$(readlink "${PREVIOUS_SYMLINK}")

    if [[ ! -d "${previous_target}" ]]; then
        log_error "Previous symlink points to non-existent directory: ${previous_target}"
        log_error "Manual intervention required."
        exit 1
    fi
}

perform_rollback() {
    local previous_target
    previous_target=$(readlink "${PREVIOUS_SYMLINK}")

    log_info "Rolling back to previous release"
    log_info "  Previous release: ${previous_target}"

    # Create temporary symlink
    local temp_symlink="${CURRENT_SYMLINK}.tmp"
    ln -s "${previous_target}" "${temp_symlink}"

    # Atomic swap of symlinks
    mv -T "${temp_symlink}" "${CURRENT_SYMLINK}"

    log_success "Rollback completed (atomic swap)"
}

verify_rollback() {
    if [[ -L "${CURRENT_SYMLINK}" ]]; then
        local current_target
        current_target=$(readlink "${CURRENT_SYMLINK}")
        local previous_target
        previous_target=$(readlink "${PREVIOUS_SYMLINK}")

        if [[ "${current_target}" == "${previous_target}" ]]; then
            log_success "Verification passed: Current now points to previous release"
            log_info "  Current -> ${current_target}"
            return 0
        else
            log_error "Verification failed: Symlinks do not match"
            log_error "  Current  -> ${current_target}"
            log_error "  Previous -> ${previous_target}"
            return 1
        fi
    else
        log_error "Verification failed: Current symlink does not exist"
        return 1
    fi
}

################################################################################
# Main Rollback Process
################################################################################

log_error "==================================================================="
log_error "INITIATING AUTOMATIC ROLLBACK"
log_error "==================================================================="
log_info "Environment: ${ENVIRONMENT}"
log_info "Reason: Health check failed on new deployment"
log_info ""

# Step 1: Validate environment
log_info "Step 1: Validating environment..."
validate_environment
log_info "  ✓ Environment validated: ${ENVIRONMENT}"
log_info ""

# Step 2: Check if previous release exists
log_info "Step 2: Checking for previous release..."
check_previous_exists
log_success "  ✓ Previous release found"
log_info ""

# Step 3: Perform rollback
log_info "Step 3: Performing rollback..."
perform_rollback
log_info ""

# Step 4: Verify rollback
log_info "Step 4: Verifying rollback..."
if verify_rollback; then
    log_info ""
    log_success "==================================================================="
    log_success "ROLLBACK COMPLETED SUCCESSFULLY"
    log_success "==================================================================="
    log_info "Environment: ${ENVIRONMENT}"
    log_info "Site has been restored to the previous working version"
    log_info ""
    log_warning "ACTION REQUIRED:"
    log_warning "  1. Check the deployment logs to identify the issue"
    log_warning "  2. Fix the issue in your code"
    log_warning "  3. Commit and push again to retry deployment"
    log_info "==================================================================="
    exit 0
else
    log_error ""
    log_error "==================================================================="
    log_error "ROLLBACK VERIFICATION FAILED"
    log_error "==================================================================="
    log_error "The rollback operation completed but verification failed"
    log_error "Manual intervention required immediately!"
    log_error "==================================================================="
    exit 1
fi
