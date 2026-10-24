import React from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return (
      <View style={s.center}>
        <Text style={s.notFound}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const isFav = has(phone.id);

  return (
    <ScrollView contentContainerStyle={s.container}>
      <View style={s.imageWrap}>
        <Image
          source={PHONE_COLORS[phone.defaultColor].image}
          style={s.image}
          resizeMode="contain"
        />
      </View>
      <Text style={s.name}>{phone.name}</Text>
      <View style={s.row}>
        <Stars value={phone.rating} />
        <Text style={s.review}>(Xem {phone.reviewCount} đánh giá)</Text>
      </View>
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text style={s.supplier}>Cung cấp bởi: {phone.supplier}</Text>

      <Pressable
        style={[s.favBtn, isFav && s.favBtnActive]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={[s.favBtnText, isFav && s.favBtnTextActive]}>
          {isFav ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  notFound: { fontSize: 16, color: colors.muted },
  container: { padding: 16, alignItems: "center" },
  imageWrap: { width: "100%", height: 250, alignItems: "center", marginBottom: 16 },
  image: { width: "70%", height: "100%" },
  name: { fontSize: 16, color: colors.text, textAlign: "center", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  review: { fontSize: 13, color: colors.muted, marginLeft: 6 },
  price: { fontSize: 20, fontWeight: "bold", color: colors.red, marginBottom: 8 },
  supplier: { fontSize: 14, color: colors.muted, marginBottom: 20 },
  favBtn: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  favBtnActive: { backgroundColor: colors.red },
  favBtnText: { fontSize: 16, color: colors.red, fontWeight: "bold" },
  favBtnTextActive: { color: "#fff" },
});
