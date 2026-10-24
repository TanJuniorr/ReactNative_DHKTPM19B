import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

type ExKey = "ex1" | "ex2" | "ex3" | "ex4" | "ex5" | null;

const EXERCISES: { key: ExKey; label: string; desc: string }[] = [
  { key: "ex1", label: "Bài 1", desc: "Select Phone (dữ liệu cứng)" },
  { key: "ex2", label: "Bài 2", desc: "Select Phone (gắn API)" },
  { key: "ex3", label: "Bài 3", desc: "Bottom Tab Navigation" },
  { key: "ex4", label: "Bài 4", desc: "Stack + Tab + Passing Params" },
  { key: "ex5", label: "Bài 5", desc: "Drawer Navigation" },
];

export default function App() {
  const [active, setActive] = useState<ExKey>(null);

  if (active === "ex1") return <SelectPhoneApp phone={PHONES[0]} />;
  if (active === "ex2") return <SelectPhoneApi />;
  if (active === "ex3") return <BottomTabApp />;
  if (active === "ex4") return <StackTabApp />;
  if (active === "ex5") return <DrawerApp />;

  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="dark-content" />
      <Text style={s.title}>Lab 06 — Navigation</Text>
      <Text style={s.subtitle}>Chọn bài tập để chạy:</Text>

      {EXERCISES.map((ex) => (
        <Pressable key={ex.key} style={s.btn} onPress={() => setActive(ex.key)}>
          <Text style={s.btnLabel}>{ex.label}</Text>
          <Text style={s.btnDesc}>{ex.desc}</Text>
        </Pressable>
      ))}

      <Text style={s.hint}>Để quay lại menu, cần reload app</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2430",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D8DCE3",
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E53A2F",
    marginRight: 12,
  },
  btnDesc: {
    fontSize: 14,
    color: "#1F2430",
    flex: 1,
  },
  hint: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
