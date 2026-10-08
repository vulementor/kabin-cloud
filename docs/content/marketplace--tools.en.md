---
page: marketplace/tools
locale: en
route: /marketplace/tools/
status: editorial-review
narrative: capability-contract
---

# Tools, APIs & SDK Capacity

Connect existing services through explicit contracts and auth scopes.

## Contract overview

- Input: Typed request + credentials
- Output: Typed response / external effect
- Validation: Schema, rate limits, scope and policy

## Scope

A connector that can read a CRM must not claim write access. Quote and authority depend on the exact operation.

## Example

A data-export API can feed a report without gaining permission to email customers.

## Action

Provide a connector

Links: /build-solutions/ and /marketplace/.

**Availability:** Capability type / illustrative contract, not a purchasable listing. Contact: info@kabin.cloud.
