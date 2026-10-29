#!/usr/bin/env bash
set -euo pipefail

endpoint="${MCP_SERVER_URL:-http://127.0.0.1:8765/}"
protocol="2026-07-28"

call_mcp() {
  local method="$1"
  local name="$2"
  local params="$3"
  local body
  body="$(jq -cn \
    --arg method "$method" \
    --argjson params "$params" \
    --arg protocol "$protocol" \
    '{jsonrpc:"2.0",id:1,method:$method,params:($params + {_meta:{"io.modelcontextprotocol/protocolVersion":$protocol,"io.modelcontextprotocol/clientCapabilities":{},"io.modelcontextprotocol/clientInfo":{name:"cafeadaptogene-ci",version:"1.0.0"}}})}')"

  local headers=(
    -H "Content-Type: application/json"
    -H "Accept: application/json, text/event-stream"
    -H "MCP-Protocol-Version: ${protocol}"
    -H "Mcp-Method: ${method}"
  )
  if [[ -n "$name" ]]; then
    headers+=(-H "Mcp-Name: ${name}")
  fi

  curl --fail-with-body --silent --show-error "$endpoint" "${headers[@]}" --data "$body"
}

discover="$(call_mcp "server/discover" "" '{}')"
jq -e '.result.supportedVersions | index("2026-07-28")' <<<"$discover" >/dev/null
jq -e '.result._meta["io.modelcontextprotocol/serverInfo"].name == "cafeadaptogene-public-knowledge"' <<<"$discover" >/dev/null

tools="$(call_mcp "tools/list" "" '{}')"
jq -e '[.result.tools[].name] | sort == ["compare_products","fetch","get_sources","search"]' <<<"$tools" >/dev/null
jq -e 'all(.result.tools[]; .annotations.readOnlyHint == true and .annotations.destructiveHint == false and .annotations.openWorldHint == false)' <<<"$tools" >/dev/null

search="$(call_mcp "tools/call" "search" '{"name":"search","arguments":{"query":"café protéiné"}}')"
jq -e '.result.structuredContent.results | length > 0 and length <= 10' <<<"$search" >/dev/null
jq -e '.result.structuredContent.results[0] | has("id") and has("title") and (.url | startswith("https://cafeadaptogene.com/"))' <<<"$search" >/dev/null

fetch="$(call_mcp "tools/call" "fetch" '{"name":"fetch","arguments":{"id":"guide:torregral"}}')"
jq -e '.result.structuredContent.id == "guide:torregral"' <<<"$fetch" >/dev/null
jq -e '.result.structuredContent | has("title") and has("text") and has("url") and has("metadata")' <<<"$fetch" >/dev/null

printf 'MCP HTTP smoke passed.\n'
