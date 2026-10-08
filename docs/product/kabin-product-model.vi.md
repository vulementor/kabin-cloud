# Kabin Agent | Mô hình sản phẩm chuẩn

**Trạng thái: Chuẩn nội dung website; định hướng sản phẩm, không khẳng định tất cả chức năng đã phát hành.**

## Một nền tảng, ba phía tham gia

**Kabin Agent là nền tảng AI Agent mở**, kết nối nhu cầu người dùng bằng ngôn ngữ tự nhiên với giải pháp tái sử dụng và Capacity do cộng đồng tạo. Kabin hướng tới tìm kiếm, kết hợp, thực thi, kiểm chứng và đo sử dụng. Kabin là nền tảng kết nối, **không phải nhóm người dùng thứ tư**.

| Phía | Đóng góp | Giá trị nhận lại | Lối vào |
|---|---|---|---|
| Người sử dụng | Kết quả mong muốn, ngữ cảnh, giới hạn chi phí, quyền duyệt | Thành phẩm kiểm chứng được, thông tin sử dụng | /vi/use-kabin/ |
| Solution Builder | Định nghĩa bài toán, tiêu chí nghiệm thu, recipe, trải nghiệm | Giải pháp tự dùng hoặc phân phối khi được hỗ trợ | /vi/build-solutions/ |
| Capacity Provider | Skill, plugin, SDK, toolkit, model, agent, API, runtime và hợp đồng | Phân phối năng lực, cơ hội thu phí theo lượt dùng | /vi/provide-capacity/ |

Một người có thể cùng lúc là User, Builder và Provider.

## Hai góc khám phá trong cùng hệ sinh thái

1. **Solution / Outcome Exchange:** Phía người dùng tìm *công việc có thể hoàn thành*, ưu tiên ExecutionRecipe đã kiểm chứng và có phiên bản.
2. **Capability Exchange:** Phía Builder/Provider tìm năng lực chuyên biệt có hợp đồng input/output, runtime, chi phí, quyền, bằng chứng và trạng thái cung cấp.

Người dùng chọn **kết quả**, không phải tự ghép các API. Builder thiết kế cách giải vấn đề; Provider cung cấp đơn vị thực thi; Kabin điều phối công việc có quyền hợp lệ.

## Vòng hoạt động mục tiêu

**Intent → Discover → Negotiate → Compose → Báo giá và phê duyệt → Execute → Verify → Meter & Settle → Learn.**

- OutcomeContract thuộc Mission / Work Order hiện hữu.
- Ưu tiên ExecutionRecipe đã kiểm chứng trước khi lập kế hoạch tự do.
- Kabin Core tự xác định tương thích, nắm thẩm quyền, trạng thái, tác động, bằng chứng. Provider không tự chứng nhận mình.
- Hybrid Agentic + Routine là **chiến lược thực thi**, không phải định nghĩa sản phẩm: Agent suy luận có giới hạn, Routine xử lý bước ổn định.
- Kết quả đăng tải bên ngoài chưa chắc chắn phải được đối soát độc lập, không tự thử lại mù quáng.
- Thanh toán theo lượt dùng, chia doanh thu Builder/Provider, payout và giao dịch Marketplace là **chức năng tương lai**, chưa có tỷ lệ chiết khấu được công bố.

## Cộng đồng mở nhưng có ranh giới tin cậy

Capacity có thể đến từ GitHub, SDK, MCP, A2A, OCI, Python/Node/CLI, browser có quản lý, worker local/remote hoặc API. **Tìm thấy repo GitHub không có nghĩa được tin cậy hay tự cài đặt.** Compiler dự kiến kiểm tra nguồn, license, runtime, sandbox build, probe có giới hạn, chứng cứ độc lập và admission. Listing không tự tạo quyền gọi thực thi.

## Chuẩn nội dung kabin.cloud

Homepage nói rõ **Kabin là gì, ba phía, Exchange và hành trình từ nhu cầu tới kết quả**. Sử dụng Kabin nói về thành phẩm của User; Xây Giải pháp nói về recipe dùng lại; Cung cấp Capacity nói về hợp đồng và admission. Solutions nói về kết quả thực tế; Marketplace giải thích hai góc khám phá; Developers hướng dẫn tích hợp trung thực. Platform chỉ giải thích công nghệ hỗ trợ thesis này, không mở đầu bằng các khẩu hiệu AI Workforce chung chung. Company/legal phải có thông tin thực.

**Trạng thái thực:** Website là HTML giới thiệu, chưa có work order trả phí, cài GitHub tự động, onboarding provider, checkout, chi trả hoặc SDK production công khai. Phải phân biệt hợp đồng kiến trúc đã chốt, code đã chạy và lộ trình.

**Nguồn chuẩn:** vulementor/kabin-agent/docs/architecture/KABIN_CAPABILITY_FABRIC_NORTH_STAR.md; KABIN_CAPABILITY_FABRIC_DECISION_REGISTER.md; KABIN_CAPABILITY_CONTRACT_V0.md; KABIN_NEGOTIATION_PROTOCOL_V0.md.

**Pháp nhân:** CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐẦU TƯ CÔNG NGHỆ XANH K’UNITY. Tên tiếng Anh hiển thị K’UNITY Green Technology Investment Company Limited còn chờ đối chiếu giấy phép. Email info@kabin.cloud; 0974744299.
