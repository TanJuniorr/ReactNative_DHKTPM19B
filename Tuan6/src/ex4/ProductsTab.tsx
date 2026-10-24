import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import type { TabProps } from "./types";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
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
