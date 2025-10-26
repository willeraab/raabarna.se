#!/bin/bash

################################################################################
# Health Check Script
#
# Performs HTTP health check and validates the title tag.
# Returns 0 on success, 1 on failure.
#
# Usage: health-check.sh <url>
#   url: The URL to check (e.g., https://dev.raabarna.se)
#
# Checks performed:
#   1. HTTP status code is 200
#   2. Response contains the expected title tag
#   3. Response time is reasonable (< 10 seconds)
#
# Example:
#   health-check.sh https://dev.raabarna.se
################################################################################

set -e  # Exit on any error
set -u  # Exit on undefined variable

# Input parameters
URL="${1}"

# Expected title tag content
EXPECTED_TITLE="Raab Consulting Group"

# Health check configuration
MAX_RETRIES=3
RETRY_DELAY=5  # seconds
TIMEOUT=10     # seconds for curl

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

################################################################################
# Functions
################################################################################

log_info() {
    echo -e "${GREEN}[HEALTH CHECK]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[HEALTH CHECK]${NC} $1"
}

log_error() {
    echo -e "${RED}[HEALTH CHECK]${NC} $1"
}

perform_health_check() {
    local attempt=$1

    log_info "Attempt ${attempt}/${MAX_RETRIES}: Checking ${URL}"

    # Perform HTTP request and capture status code and body
    local http_response
    local http_code
    local response_body

    http_response=$(curl -s -w "\n%{http_code}" --max-time ${TIMEOUT} "${URL}" 2>/dev/null || echo "ERROR")

    if [[ "${http_response}" == "ERROR" ]]; then
        log_error "Failed to connect to ${URL}"
        return 1
    fi

    # Extract status code (last line)
    http_code=$(echo "${http_response}" | tail -n 1)

    # Extract body (all lines except last)
    response_body=$(echo "${http_response}" | sed '$d')

    # Check 1: HTTP Status Code
    if [[ "${http_code}" != "200" ]]; then
        log_error "HTTP status code is ${http_code}, expected 200"
        return 1
    fi
    log_info "  ✓ HTTP status: 200 OK"

    # Check 2: Title Tag
    if ! echo "${response_body}" | grep -q "<title>${EXPECTED_TITLE}</title>"; then
        log_error "Title tag not found or incorrect"
        log_error "  Expected: <title>${EXPECTED_TITLE}</title>"

        # Try to extract actual title for debugging
        local actual_title
        actual_title=$(echo "${response_body}" | grep -oP '<title>\K[^<]+' || echo "NOT FOUND")
        log_error "  Found: ${actual_title}"

        return 1
    fi
    log_info "  ✓ Title tag: '${EXPECTED_TITLE}' found"

    # Check 3: Basic HTML structure (sanity check)
    if ! echo "${response_body}" | grep -q "<html"; then
        log_error "Response does not appear to be valid HTML"
        return 1
    fi
    log_info "  ✓ Valid HTML response"

    return 0
}

################################################################################
# Main Health Check Process
################################################################################

log_info "==================================================================="
log_info "Starting health check"
log_info "==================================================================="
log_info "URL: ${URL}"
log_info "Expected title: ${EXPECTED_TITLE}"
log_info "Max retries: ${MAX_RETRIES}"
log_info "Timeout: ${TIMEOUT}s"
log_info ""

# Retry loop
for attempt in $(seq 1 ${MAX_RETRIES}); do
    if perform_health_check ${attempt}; then
        log_info ""
        log_info "==================================================================="
        log_info "Health check PASSED ✓"
        log_info "==================================================================="
        log_info "All checks completed successfully on attempt ${attempt}"
        log_info "Site is healthy and ready to serve traffic"
        log_info "==================================================================="
        exit 0
    fi

    # If not the last attempt, wait before retrying
    if [[ ${attempt} -lt ${MAX_RETRIES} ]]; then
        log_warning "Check failed, waiting ${RETRY_DELAY}s before retry..."
        sleep ${RETRY_DELAY}
        log_info ""
    fi
done

# All retries exhausted
log_error ""
log_error "==================================================================="
log_error "Health check FAILED ✗"
log_error "==================================================================="
log_error "All ${MAX_RETRIES} attempts failed"
log_error "URL: ${URL}"
log_error ""
log_error "This deployment will be rolled back automatically"
log_error "==================================================================="

exit 1
