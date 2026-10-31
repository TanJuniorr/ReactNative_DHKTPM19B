import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors, radius } from "../theme";
interface Props { value: PriceRange; onChange: (v: PriceRange) => void; }
export function PriceFilter({ value, onChange }: Props) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
    {PRICE_RANGES.map((r) => {
      const active = value === r.key;
      return <Pressable key={r.key} style={[styles.chip, active && styles.active]}
        onPress={() => onChange(active ? null : r.key)}>
        <Text style={[styles.label, active && styles.activeText]}>{r.label}</Text>
      </Pressable>;
    })}
  </ScrollView>;
}
const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingBottom: 10, gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  active: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  label: { color: colors.text, fontWeight: "600" },
  activeText: { color: "#fff" },
});
