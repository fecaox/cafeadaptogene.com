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

discover=""
for attempt in {1..10}; do
  if discover="$(call_mcp "server/discover" "" '{}' 2>/dev/null)"; then
    break
  fi
  sleep 1
done

if [[ -z "$discover" ]]; then
  printf 'Le serveur MCP ne répond pas.\n' >&2
  exit 1
fi

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

comparison="$(call_mcp "tools/call" "compare_products" '{"name":"compare_products","arguments":{"ids":["torregral-torregral"]}}')"
jq -e '.result.structuredContent.products[0].id == "product:torregral-torregral"' <<<"$comparison" >/dev/null
jq -e '.result.structuredContent.missingIds | length == 0' <<<"$comparison" >/dev/null

sources="$(call_mcp "tools/call" "get_sources" '{"name":"get_sources","arguments":{"id":"guide:torregral"}}')"
jq -e '.result.structuredContent.sources | length > 0' <<<"$sources" >/dev/null
jq -e 'all(.result.structuredContent.sources[]; has("label") and (.url | startswith("https://")))' <<<"$sources" >/dev/null

printf 'MCP HTTP smoke passed.\n'
