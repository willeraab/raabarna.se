#!/bin/bash

################################################################################
# Cleanup Script
#
# Removes old releases while keeping the most recent N releases.
# This prevents the releases directory from growing indefinitely.
#
# Usage: cleanup.sh <environment> <keep_count>
#   environment: Either 'dev' or 'prod'
#   keep_count: Number of most recent releases to keep (default: 5)
#
# The script will:
#   - Never delete the current or previous release (symlinked)
#   - Keep the N most recent releases based on directory timestamps
#   - Remove all older releases
#
# Example:
#   cleanup.sh dev 5
#   cleanup.sh prod 3
################################################################################

set -e  # Exit on any error
set -u  # Exit on undefined variable

# Input parameters
ENVIRONMENT="${1}"
KEEP_COUNT="${2:-5}"  # Default to 5 if not specified

# Base directories
BASE_DIR="/var/www/raabarna.se"
RELEASES_DIR="${BASE_DIR}/releases/${ENVIRONMENT}"
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
    echo -e "${BLUE}[CLEANUP]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[CLEANUP]${NC} $1"
}

log_error() {
    echo -e "${RED}[CLEANUP]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[CLEANUP]${NC} $1"
}

validate_environment() {
    if [[ "${ENVIRONMENT}" != "dev" && "${ENVIRONMENT}" != "prod" ]]; then
        log_error "Environment must be 'dev' or 'prod', got: ${ENVIRONMENT}"
        exit 1
    fi
}

validate_keep_count() {
    if ! [[ "${KEEP_COUNT}" =~ ^[0-9]+$ ]] || [[ "${KEEP_COUNT}" -lt 1 ]]; then
        log_error "Keep count must be a positive integer, got: ${KEEP_COUNT}"
        exit 1
    fi
}

get_protected_releases() {
    local protected_releases=()

    # Protect current release
    if [[ -L "${CURRENT_SYMLINK}" ]]; then
        local current_target
        current_target=$(readlink "${CURRENT_SYMLINK}")
        current_target=$(basename "${current_target}")
        protected_releases+=("${current_target}")
        log_info "  Protected (current): ${current_target}"
    fi

    # Protect previous release
    if [[ -L "${PREVIOUS_SYMLINK}" ]]; then
        local previous_target
        previous_target=$(readlink "${PREVIOUS_SYMLINK}")
        previous_target=$(basename "${previous_target}")

        # Only add if different from current
        if [[ ! " ${protected_releases[@]} " =~ " ${previous_target} " ]]; then
            protected_releases+=("${previous_target}")
            log_info "  Protected (previous): ${previous_target}"
        fi
    fi

    echo "${protected_releases[@]}"
}

get_releases_to_delete() {
    local protected_releases=("$@")

    # Get all releases sorted by modification time (newest first)
    local all_releases
    all_releases=$(find "${RELEASES_DIR}" -maxdepth 1 -type d -name "release-*" -printf "%T@ %f\n" | sort -rn | cut -d' ' -f2)

    local releases_to_keep=()
    local releases_to_delete=()
    local count=0

    for release in ${all_releases}; do
        # Check if this release is protected
        if [[ " ${protected_releases[@]} " =~ " ${release} " ]]; then
            log_info "  Keeping (protected): ${release}"
            releases_to_keep+=("${release}")
            continue
        fi

        # Check if we're still within the keep count
        if [[ ${count} -lt ${KEEP_COUNT} ]]; then
            log_info "  Keeping (recent): ${release}"
            releases_to_keep+=("${release}")
            ((count++))
        else
            log_warning "  Marking for deletion: ${release}"
            releases_to_delete+=("${release}")
        fi
    done

    echo "${releases_to_delete[@]}"
}

delete_releases() {
    local releases_to_delete=("$@")

    if [[ ${#releases_to_delete[@]} -eq 0 ]]; then
        log_info "No releases to delete"
        return 0
    fi

    local deleted_count=0
    local failed_count=0

    for release in "${releases_to_delete[@]}"; do
        local release_path="${RELEASES_DIR}/${release}"

        if [[ -d "${release_path}" ]]; then
            log_info "Deleting: ${release}"

            if rm -rf "${release_path}"; then
                log_success "  ✓ Deleted: ${release}"
                ((deleted_count++))
            else
                log_error "  ✗ Failed to delete: ${release}"
                ((failed_count++))
            fi
        else
            log_warning "  Skipped (not found): ${release}"
        fi
    done

    echo "${deleted_count}:${failed_count}"
}

################################################################################
# Main Cleanup Process
################################################################################

log_info "==================================================================="
log_info "Starting cleanup process"
log_info "==================================================================="
log_info "Environment: ${ENVIRONMENT}"
log_info "Keep count: ${KEEP_COUNT}"
log_info "Releases directory: ${RELEASES_DIR}"
log_info ""

# Step 1: Validate inputs
log_info "Step 1: Validating inputs..."
validate_environment
validate_keep_count
log_success "  ✓ Validation passed"
log_info ""

# Step 2: Check if releases directory exists
log_info "Step 2: Checking releases directory..."
if [[ ! -d "${RELEASES_DIR}" ]]; then
    log_warning "Releases directory does not exist: ${RELEASES_DIR}"
    log_info "Nothing to clean up"
    exit 0
fi

# Count existing releases
release_count=$(find "${RELEASES_DIR}" -maxdepth 1 -type d -name "release-*" | wc -l)
log_info "  Found ${release_count} release(s)"
log_info ""

if [[ ${release_count} -eq 0 ]]; then
    log_info "No releases found, nothing to clean up"
    exit 0
fi

# Step 3: Identify protected releases
log_info "Step 3: Identifying protected releases..."
protected_releases=($(get_protected_releases))
log_info ""

# Step 4: Determine which releases to delete
log_info "Step 4: Analyzing releases..."
releases_to_delete=($(get_releases_to_delete "${protected_releases[@]}"))
log_info ""

# Step 5: Delete old releases
log_info "Step 5: Deleting old releases..."
if [[ ${#releases_to_delete[@]} -eq 0 ]]; then
    log_info "No releases to delete (all releases are within keep count or protected)"
    log_info ""
    log_success "==================================================================="
    log_success "Cleanup completed - No action needed"
    log_success "==================================================================="
    exit 0
fi

delete_result=$(delete_releases "${releases_to_delete[@]}")
deleted_count=$(echo "${delete_result}" | cut -d':' -f1)
failed_count=$(echo "${delete_result}" | cut -d':' -f2)

# Ensure counts are set to 0 if empty
deleted_count=${deleted_count:-0}
failed_count=${failed_count:-0}

log_info ""

# Step 6: Summary
log_success "==================================================================="
log_success "Cleanup completed"
log_success "==================================================================="
log_info "Environment: ${ENVIRONMENT}"
log_info "Total releases before cleanup: ${release_count}"
log_info "Releases deleted: ${deleted_count}"

if [[ ${failed_count} -gt 0 ]]; then
    log_warning "Failed deletions: ${failed_count}"
fi

remaining_count=$((release_count - deleted_count))
log_info "Releases remaining: ${remaining_count}"
log_info ""
log_info "Disk space freed: $(du -sh "${RELEASES_DIR}" 2>/dev/null | cut -f1) total in ${ENVIRONMENT} releases"
log_success "==================================================================="

exit 0
