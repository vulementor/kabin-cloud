---
page: platform/architecture
locale: vi
route: /vi/platform/architecture/
status: editorial-review
narrative: one-architecture-layer
---

# Kiến trúc nền tảng: Fabric ghép, Core thực thi.

Kabin kết nối ba phía nhưng Provider không tự nắm quyền đối với dữ liệu người dùng.

## Responsibility

1. Intent & Work Order
2. Fabric tìm và ghép Capacity
3. Core thực thi có quyền

## Example

Recipe của Builder chọn Capacity hợp lệ, nhưng Kabin Core vẫn kiểm soát quyền, job identity, effect gate và trạng thái.

## Read more

/vi/solutions/ · /vi/solutions/ · /vi/marketplace/

Status: conceptual architecture. Contact info@kabin.cloud.
