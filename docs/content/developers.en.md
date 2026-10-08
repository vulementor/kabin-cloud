---
page: developers
locale: en
route: /developers/
status: rewritten-review-pending
narrative: STRINGS
---

# A workflow becomes reusable when its contract is clear.

An agent cannot safely orchestrate a mystery box. Before integrating a tool, define what it accepts, what it produces, what it may change and how uncertain outcomes are handled.

## SHARE / START WITH THE FAILURE MODE

### Undocumented execution is expensive to recover.
A script may complete locally while a network response times out. A browser can submit a form without delivering a confirmation. A rendering job may write a file before its receipt is committed. Without a contract and durable state, orchestration risks repeating work or mistaking an unknown result for success.

## TEACH / ONE CAPACITY, BOUNDED

### Describe the work before you trigger it.
This concept manifest names a single media review-packet task. Its fields illustrate the questions a provider contract should answer; the syntax is not an official Kabin API specification.

```json
{
  "capacity": "media.review-packet",
  "version": "0.1.0-concept",
  "input": ["brief", "approved_sources"],
  "output": ["review_packet", "receipt"],
  "authority": {"external_publish": "human_approval"},
  "on_uncertain_result": "verify_first"
}
```

Teaching example only. No production endpoint, published SDK or runnable installation is implied.

### What the contract gives the next worker
- **Inputs are explicit:** A caller knows which project, brief and approved source materials are required.
- **Outputs are inspectable:** A resulting packet and review notes are named before execution.
- **Authority is visible:** The package can be prepared automatically; publication remains behind approval.
- **Unknown is a real state:** A timeout does not automatically authorize resubmission.

## INTRIGUE

### What if the service did the work, but the response was lost?
Retrying immediately might duplicate an upload or publish a second post. The safer path is to inspect existing artifacts, receipt IDs and external evidence before deciding whether the action needs another attempt. That boundary is more valuable than a glossy success animation.

- **PLANNED:** Intent and permissions resolved; no irreversible action submitted.
- **RUNNING:** Work in progress, with job ID and observable checkpoints.
- **UNKNOWN:** Outcome cannot be established from current evidence; do not blindly repeat.
- **VALIDATED:** Outputs and receipts have been checked against their contract.

## NURTURE

### Build for verification, not just a green status badge.
Contracts, structured errors, approval gates and receipts make a Capacity easier to compose across different models or runtimes. None of these practices requires promising a universal adapter or pretending an unreleased SDK exists.

1. Identify the smallest useful operation.
2. Specify inputs, outputs and permission scope.
3. Define retry/idempotency and uncertain outcomes.
4. Provide evidence and examples a reviewer can inspect.

## Action

### Have a service or workflow worth turning into Capacity?
Share its existing interface, runtime boundary and failure modes. We can discuss the contract model and product direction without claiming a live public API.

Contact: info@kabin.cloud | +84 974 744 299

## Compliance note
Architecture proposal and illustrative JSON. No released SDK, endpoint, provider publishing or commercial SLA is asserted.

- Copy and bespoke visual are for editorial review; no claims of live Marketplace, SDK or production API.
- Operator VI: CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐẦU TƯ CÔNG NGHỆ XANH K’UNITY.
- Operator EN display: K’UNITY Green Technology Investment Company Limited (translation pending certificate verification).
