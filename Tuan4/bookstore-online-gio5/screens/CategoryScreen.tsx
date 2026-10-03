// GIỜ 2 — Màn hình Danh mục: Category Chips (flexWrap) + Book Grid (2 cột)
// Tích hợp vào tab "Danh mục" của Giờ 5 — nội dung gốc từ bookstore-online-gio2.
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { BOOKS } from "../data";

export function CategoryScreen({
  onPressBook,
}: {
  onPressBook: (id: number) => void;
}) {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Danh mục</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    // paddingBottom đủ lớn để phần tử cuối không bị TabBar (64px) che mất.
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 4,
  },
});
