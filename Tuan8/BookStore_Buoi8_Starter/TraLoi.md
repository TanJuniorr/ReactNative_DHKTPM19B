# Câu hỏi bổ sung — Buổi 8

## Câu 1: Cờ `ready` trong `useAutoPersist`

Lần render đầu tiên, giỏ hàng trong Redux store còn là mảng rỗng `[]` (giá trị khởi tạo mặc định). Nếu bỏ điều kiện `ready` thì `useEffect` sẽ chạy ngay lần render đầu và ghi mảng rỗng vào AsyncStorage, **đè lên dữ liệu giỏ hàng đã lưu trước đó**. Sau đó, khi hàm `loadJSON` đọc xong và dispatch `hydrateCart`, dữ liệu cũ đã bị mất vì vừa bị ghi đè bằng `[]`. Cờ `ready` chỉ bật `true` sau khi đọc AsyncStorage xong và nạp dữ liệu vào store, nên chặn được việc ghi sớm này.

## Câu 2: Token giả — hai điểm không an toàn

1. **Mật khẩu nằm nguyên trong `db.json` (dạng thô)** và được so sánh ở phía app (client). Bất kỳ ai mở DevTools hay bắt request đều thấy mật khẩu. Hệ thống thật phải để **server** kiểm tra mật khẩu (đã được băm bằng bcrypt/argon2) và không bao giờ gửi mật khẩu thô về client.
2. **Token do app tự tạo** nên ai cũng có thể làm giả, không có cơ chế xác minh hay hết hạn. Hệ thống thật dùng JWT có chữ ký bí mật và thời hạn; app lưu token bằng **SecureStore** (Expo) hoặc Keychain (iOS) / Keystore (Android) thay vì AsyncStorage dạng thô.

## Câu 3: Hai effect trong `CartItemRow`

Nếu xóa effect đồng bộ `setQty(item.quantity)`, khi store thay đổi `item.quantity` **từ nơi khác** (ví dụ: nạp giỏ hàng từ AsyncStorage khi mở app, hoặc xóa rồi thêm lại cùng sản phẩm), state cục bộ `qty` sẽ giữ nguyên giá trị cũ từ lần render đầu tiên, dẫn đến **số hiển thị trên nút bị lệch** so với store. Effect này đảm bảo `qty` luôn đồng bộ khi `item.quantity` thay đổi bởi nguồn bên ngoài.

## Câu 4: Một nguồn state (Single source of truth)

Nếu `HeartButton` dùng `useState` riêng ở mỗi nơi thì hai trái tim ở lưới sách (Home) và ở trang Chi tiết sẽ **hoàn toàn độc lập**: bấm tim ở lưới thành ♥ đỏ, nhưng vào trang chi tiết vẫn thấy ♡ trắng và ngược lại. Redux store giải quyết vấn đề này bằng cách là **một nguồn dữ liệu duy nhất** — mọi component đọc cùng một giá trị `ids` từ store thông qua hook `useWishlist()`, nên trạng thái tim luôn khớp nhau ở mọi nơi.

## Câu 5: Hiện/ẩn mật khẩu (Code bổ sung)

Đã thêm vào `LoginScreen.tsx`:

```tsx
const [showPassword, setShowPassword] = useState(false);

<View>
  <FormField
    label="Mật khẩu"
    value={password}
    onChangeText={setPassword}
    error={errors.password}
    secureTextEntry={!showPassword}
  />
  <Pressable onPress={() => setShowPassword((v) => !v)} style={styles.eyeBtn} hitSlop={8}>
    <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁"}</Text>
  </Pressable>
</View>
```

Khi bấm biểu tượng 👁, state `showPassword` đổi giữa `true`/`false`, điều khiển `secureTextEntry={!showPassword}` để hiện hoặc ẩn mật khẩu. Khi đang hiện mật khẩu, icon đổi thành 🙈 để người dùng biết có thể bấm để ẩn lại.
