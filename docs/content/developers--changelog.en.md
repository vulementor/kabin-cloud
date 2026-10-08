---
page: developers/changelog
locale: en
route: /developers/changelog/
status: editorial-review
narrative: capacity-developer-reference
---

# Keep Capacity releases traceable.

A changed contract must not silently break solutions that depend on its old behavior.

## Contract requirements

1. Version intent
2. Compatibility impact
3. Evidence by release

## Example

If a scene detector changes timestamps from seconds to milliseconds, declare the breaking change and retest recipes.

## Next

/developers/runtime/ and /provide-capacity/.

Availability: conceptual, no live API/SDK. Contact info@kabin.cloud.
