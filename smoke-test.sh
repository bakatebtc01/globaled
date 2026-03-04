#!/usr/bin/env bash
set -euo pipefail
PORT="${1:-3000}"
URL="http://localhost:${PORT}"

python3 -m http.server "$PORT" >/tmp/globaled_smoke_server.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT

sleep 1

python3 -m http.server --help >/dev/null
curl -I "$URL/index.html"
curl -I "$URL/apply.html"
curl -I "$URL/scholarships.html"

echo "Smoke test passed for ${URL}"
