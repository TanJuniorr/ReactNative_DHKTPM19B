# Trả lời câu hỏi bổ sung — BookStore Buổi 7

## Câu 1. Cấu trúc điều hướng

`BookDetail` được đăng ký ở **Root Stack** vì đây là màn hình chi tiết được đẩy lên từ Home và cần có nút quay lại, đồng thời che thanh Bottom Tab. Nếu đặt `BookDetail` trong Tab, nó trở thành một màn tab riêng, có thể luôn xuất hiện trên thanh tab hoặc phải cấu hình ẩn tab; trải nghiệm mở chi tiết rồi quay lại sẽ không giống thiết kế.

## Câu 2. Redux và useMemo

Redux Toolkit dùng **Immer**, cho phép viết `state.items.push(...)` trong reducer theo cú pháp thay đổi trực tiếp nhưng thực tế Immer tạo ra state mới bất biến. Nếu bỏ `useMemo` trong `useCart` và tính tổng trực tiếp mỗi lần render, kết quả hiển thị **không đổi**, nhưng phép tính sẽ chạy lại ở mọi lần render dù `items` không thay đổi, có thể tốn tài nguyên khi giỏ lớn.

## Câu 3. Promise.all và Promise.allSettled

Với `Promise.all`, nếu `getCategories()` bị lỗi dù `getBooks()` thành công thì toàn bộ `Promise.all` bị reject; Home hiện `ErrorView` thay vì danh sách sách. Có thể dùng `Promise.allSettled` để lấy phần thành công và cho Home vẫn hiển thị sách (với danh mục rỗng khi API danh mục lỗi), nhưng phải xử lý từng kết quả riêng và chấp nhận dữ liệu/khả năng lọc theo danh mục có thể chưa đầy đủ.

## Câu 4. Debounce

Không nên đặt `setTimeout` trực tiếp trong `onChangeText` vì mỗi ký tự có thể tạo một timer riêng, dẫn tới nhiều lần lọc liên tiếp với từ khóa cũ. `useEffect` trong `useDebounce` có hàm dọn dẹp `clearTimeout` để hủy timer trước khi chạy timer mới hoặc khi component unmount, giúp chỉ áp dụng giá trị cuối cùng sau 400 ms và tránh cập nhật không còn phù hợp.

## Câu 5. Bổ sung sắp xếp giá tăng dần / giảm dần

Home có state `sortOrder` với ba giá trị `default`, `asc`, `desc`; trong `visibleBooks`, lọc sách trước rồi sắp xếp bản sao của mảng theo `price`. Dùng `[...filtered]` để không thay đổi trực tiếp mảng kết quả lọc hoặc dữ liệu gốc; giao diện có các nút **Mặc định**, **Tăng dần** và **Giảm dần**.