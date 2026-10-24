import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import type { TabProps } from "./types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const saved = PHONES.filter((p) => ids.includes(p.id));

  if (saved.length === 0) {
    return (
      <View style={s.emptyWrap}>
        <Text style={s.emptyText}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={saved}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <Pressable
          style={s.card}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
          <Text style={s.name}>{item.name.split(" - ")[0]}</Text>
          <Stars value={item.rating} size={14} />
          <Text style={s.price}>{formatPrice(item.price)}</Text>
        </Pressable>
      )}
    />
  );
}

const s = StyleSheet.create({
  emptyWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 15, color: colors.muted },
  card: {
    backgroundColor: colors.bg,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 4,
  },
  name: { fontSize: 15, color: colors.text, fontWeight: "500" },
  price: { fontSize: 15, color: colors.red, fontWeight: "bold" },
});
