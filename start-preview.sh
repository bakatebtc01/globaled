#!/usr/bin/env bash
set -euo pipefail
PORT="${1:-3000}"
echo "Starting Global-Ed preview on http://localhost:${PORT}"
python3 -m http.server "$PORT"
