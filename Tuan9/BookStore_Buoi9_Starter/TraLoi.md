# Trả lời câu hỏi bổ sung — Buổi 9

## Câu 1: Giá trị dẫn xuất

Ở Checkout, `errors` và `valid` được tính trực tiếp mỗi lần render vì chúng là **giá trị dẫn xuất** (derived values) từ `name`, `phone`, `address` — mỗi khi state thay đổi, React render lại và `errors`/`valid` luôn khớp với dữ liệu hiện tại. Nếu dùng `useState` riêng cho `errors` thì phải nhớ gọi `setErrors(...)` ở **mọi chỗ** gọi `setName`, `setPhone`, `setAddress`; quên một chỗ là lỗi hiện sai hoặc nút bật/khoá sai, gây bug khó phát hiện.

## Câu 2: Thứ tự gọi

Nếu `clear()` chạy **trước** `await createOrder(…)` thì khi mất mạng, giỏ hàng đã bị xoá trống trong khi đơn hàng chưa được tạo trên server — người dùng mất hết sản phẩm đã chọn và không có đơn nào được ghi nhận. Đặt `clear()` ngay **sau** `await createOrder(…)` đảm bảo chỉ khi server đã nhận đơn thành công thì mới xoá giỏ; nếu lỗi thì giỏ còn nguyên để người dùng thử lại.

## Câu 3: PUT hay PATCH

Nếu dùng `PUT /users/1` với `{ name, phone }`, json-server sẽ **thay thế toàn bộ** object user bằng `{ id: 1, name, phone }` — mất luôn các trường `email`, `password` và mọi trường khác. Bài này chọn `PATCH` vì PATCH chỉ cập nhật các trường được gửi đi (`name`, `phone`), giữ nguyên các trường còn lại, an toàn hơn cho form chỉnh sửa một phần dữ liệu.

## Câu 4: Cập nhật lạc quan

Nếu bỏ đoạn hoàn lại `read: false` trong `catch`, khi mất mạng giao diện sẽ báo thông báo đã đọc (nền trắng) nhưng server vẫn lưu `read: false`. Mở lại màn Thông báo thì nó lại quay về chưa đọc (nền xanh), gây khó hiểu cho người dùng.

- **Nên dùng cập nhật lạc quan**: thả tim/yêu thích sách — thao tác nhẹ, phản hồi nhanh, sai thì hoàn lại dễ dàng.
- **Không nên dùng**: thanh toán đặt hàng — phải chắc chắn server đã nhận đơn thành công mới báo cho người dùng, vì liên quan đến tiền và đơn hàng thật.

## Câu 5: Code bổ sung — Bộ lọc trạng thái đơn hàng
Đã thêm vào chương trình và chạy thành công.
