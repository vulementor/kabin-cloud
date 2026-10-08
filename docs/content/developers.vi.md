---
page: developers
locale: vi
route: /vi/developers/
status: rewritten-review-pending
narrative: STRINGS
---

# Workflow chỉ tái sử dụng được khi hợp đồng đủ rõ.

Agent không thể điều phối an toàn một hộp đen. Trước khi kết nối công cụ, phải xác định nó nhận gì, tạo ra gì, được thay đổi gì và xử lý kết quả chưa chắc chắn ra sao.

## SHARE / BẮT ĐẦU TỪ ĐIỂM LỖI

### Thực thi không có hợp đồng sẽ khó phục hồi.
Script có thể đã chạy xong tại máy nhưng phản hồi mạng bị timeout. Browser có thể đã gửi biểu mẫu mà không nhận xác nhận. Job dựng video có thể ghi file trước khi biên nhận được lưu. Không có hợp đồng và trạng thái bền vững, bộ điều phối dễ làm trùng việc hoặc coi kết quả chưa rõ là thành công.

## TEACH / MỘT CAPACITY CÓ GIỚI HẠN

### Mô tả công việc trước khi kích hoạt.
Manifest khái niệm dưới đây mô tả một tác vụ đóng gói tài nguyên review media. Các trường minh họa những câu hỏi hợp đồng nhà cung cấp phải trả lời; cú pháp không phải đặc tả API chính thức của Kabin.

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

Ví dụ để giải thích kiến trúc. Không phải endpoint production, SDK đã phát hành hoặc gói có thể cài đặt.

### Hợp đồng giúp gì cho người thực hiện tiếp theo?
- **Đầu vào rõ ràng:** Người gọi biết dự án, brief và nguồn thông tin nào đã được duyệt.
- **Đầu ra kiểm tra được:** Gói tài nguyên và ghi chú review được xác định trước khi chạy.
- **Quyền hạn nhìn thấy được:** Hệ thống chuẩn bị gói tự động; việc xuất bản vẫn cần phê duyệt.
- **UNKNOWN là trạng thái thật:** Timeout không tự động cho phép gửi lại một lần nữa.

## INTRIGUE

### Nếu dịch vụ đã chạy xong nhưng phản hồi bị mất thì sao?
Thử lại ngay có thể tải trùng tài nguyên hoặc đăng bài lần thứ hai. Cách an toàn hơn là kiểm tra artifact, receipt ID và bằng chứng bên ngoài đã tồn tại trước khi quyết định có cần chạy lại. Ranh giới này đáng giá hơn một thông báo thành công đẹp mắt.

- **PLANNED:** Đã xác định ý định và quyền hạn; chưa gửi thao tác không thể đảo ngược.
- **RUNNING:** Công việc đang thực hiện, có job ID và checkpoint quan sát được.
- **UNKNOWN:** Chưa đủ bằng chứng xác định kết quả; không thử lại mù quáng.
- **VALIDATED:** Đầu ra và biên nhận đã đối chiếu với hợp đồng.

## NURTURE

### Xây để kiểm chứng, không chỉ để hiện màu xanh.
Hợp đồng, lỗi có cấu trúc, điểm duyệt và receipt giúp Capacity phối hợp tốt hơn trên nhiều model hoặc runtime. Các nguyên tắc đó không đồng nghĩa Kabin đã có adapter phổ quát hoặc SDK công khai.

1. Xác định thao tác nhỏ nhất có ích.
2. Khai báo đầu vào, đầu ra và phạm vi quyền hạn.
3. Định nghĩa retry/idempotency và trạng thái chưa rõ.
4. Cung cấp bằng chứng và ví dụ để người duyệt đối chiếu.

## Action

### Anh có dịch vụ hoặc workflow phù hợp để thành Capacity?
Hãy chia sẻ giao diện hiện có, giới hạn runtime và các tình huống lỗi. Kabin sẽ trao đổi về mô hình hợp đồng và định hướng sản phẩm, không quảng cáo API chưa phát hành.

Contact: info@kabin.cloud | +84 974 744 299

## Compliance note
Đề xuất kiến trúc và JSON minh họa. Không khẳng định đã có SDK, endpoint, đăng tải provider hay SLA thương mại.

- Copy and bespoke visual are for editorial review; no claims of live Marketplace, SDK or production API.
- Operator VI: CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐẦU TƯ CÔNG NGHỆ XANH K’UNITY.
- Operator EN display: K’UNITY Green Technology Investment Company Limited (translation pending certificate verification).
