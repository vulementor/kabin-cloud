---
page: developers/api
locale: en
route: /developers/api/
status: editorial-review
narrative: capacity-developer-reference
---

# Wrap an API with clear authority.

API adapters must declare exact operations, credential scope and externally visible effects.

## Contract requirements

1. Method and input
2. Auth / scope
3. Output and retries

## Example

A CRM read endpoint cannot be promoted as a write connector. A timeout after sending requires reconciliation.

## Next

/developers/manifest/ and /provide-capacity/.

Availability: conceptual, no live API/SDK. Contact info@kabin.cloud.
