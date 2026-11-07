import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = { cod: "Thanh toán khi nhận hàng (COD)", bank: "Chuyển khoản ngân hàng" } as const;

const STATUS_FILTERS: { id: "all" | OrderStatus; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "pending", label: "Chờ xác nhận" },
  { id: "shipping", label: "Đang giao" },
  { id: "completed", label: "Hoàn tất" },
  { id: "cancelled", label: "Đã huỷ" },
];

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { items: cartItems, add, setQty } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  // Code bổ sung: State lưu bộ lọc trạng thái đơn hàng
  const [status, setStatus] = useState<"all" | OrderStatus>("all");

  // BT9.3a: load orders
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

  // Code bổ sung: Lọc dữ liệu truyền cho FlatList theo trạng thái đã chọn
  const filteredOrders = useMemo(
    () => orders.filter((o) => status === "all" || o.status === status),
    [orders, status]
  );

  // BT9.C1: Mua lại
  const reorder = async (order: Order) => {
    try {
      const books = await getBooks();
      order.items.forEach((it) => {
        const book = books.find((b) => b.id === it.bookId);
        if (!book) return;
        const inCart = cartItems.find((c) => c.bookId === it.bookId);
        if (!inCart) add({ bookId: book.id, title: book.title, price: book.price, emoji: book.emoji, color: book.color, stock: book.stock });
        setQty(it.bookId, (inCart?.quantity ?? 0) + it.quantity);
      });
      showMessage("Đã thêm vào giỏ", "Các sản phẩm của đơn hàng đã được thêm lại vào giỏ.", () =>
        navigation.navigate("Tabs", { screen: "Cart" }));
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    }
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  // BT9.3b + BT9.3c
  return (
    <View style={styles.container}>
      {/* Code bổ sung: Hàng nút chọn bộ lọc trạng thái */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {STATUS_FILTERS.map((f) => {
            const active = status === f.id;
            return (
              <Pressable
                key={f.id}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setStatus(f.id)}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(o) => String(o.id)}
        contentContainerStyle={{ padding: 12, gap: 10, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState
            emoji="🧾"
            title={status === "all" ? "Bạn chưa có đơn hàng nào" : `Không có đơn hàng nào ở trạng thái "${STATUS_FILTERS.find((f) => f.id === status)?.label}"`}
            message="Đặt đơn đầu tiên để theo dõi tại đây."
            actionLabel="Mua sắm ngay"
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        }
        renderItem={({ item: o }) => {
          const open = openId === o.id;
          return (
            <View style={styles.card}>
              <Pressable onPress={() => setOpenId(open ? null : o.id)} style={styles.head}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={styles.code}>Đơn #{o.id}</Text>
                  <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
                  <Text style={styles.total}>{formatPrice(o.total)}</Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 6 }}>
                  <StatusBadge status={o.status} />
                  <Text style={styles.toggle}>{open ? "Thu gọn ▲" : "Chi tiết ▼"}</Text>
                </View>
              </Pressable>
              {open && (
                <View style={styles.detail}>
                  {o.items.map((it) => (
                    <View key={it.bookId} style={styles.itemRow}>
                      <Text style={styles.itemTitle} numberOfLines={1}>{it.title} × {it.quantity}</Text>
                      <Text style={styles.itemPrice}>{formatPrice(it.price * it.quantity)}</Text>
                    </View>
                  ))}
                  <View style={styles.addr}>
                    <Text style={styles.addrH}>Giao đến</Text>
                    <Text style={styles.addrT}>{o.address.name} · {o.address.phone}</Text>
                    <Text style={styles.addrT}>{o.address.address}</Text>
                    <Text style={styles.addrT}>Thanh toán: {PAYMENT_LABEL[o.paymentMethod]}</Text>
                  </View>
                  {o.status === "completed" && <PrimaryButton title="Mua lại" variant="outline" onPress={() => reorder(o)} />}
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  filterWrapper: { backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: colors.line },
  filterRow: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.line,
  },
  filterChipActive: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigo,
  },
  filterText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 13,
  },
  filterTextActive: {
    color: "#fff",
  },
  card: { backgroundColor: "#fff", borderRadius: radius.md, overflow: "hidden" },
  head: { flexDirection: "row", padding: 14, gap: 10 },
  code: { fontWeight: "800", color: colors.navy, fontSize: 15 },
  date: { color: colors.muted, fontSize: 12 },
  total: { fontWeight: "700", color: colors.indigo, fontSize: 16, marginTop: 2 },
  toggle: { color: colors.indigo, fontWeight: "600", fontSize: 12 },
  detail: { borderTopWidth: 1, borderTopColor: colors.line, padding: 14, gap: 8 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { fontWeight: "600", color: colors.text },
  addr: { backgroundColor: colors.bg, borderRadius: radius.sm, padding: 10, gap: 2, marginTop: 4 },
  addrH: { fontWeight: "700", color: colors.navy, marginBottom: 2 },
  addrT: { color: colors.muted, fontSize: 13 },
});
