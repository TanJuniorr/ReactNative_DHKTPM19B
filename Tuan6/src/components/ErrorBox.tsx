import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 24 },
  icon: { fontSize: 48 },
  message: { marginTop: 12, fontSize: 16, color: colors.text, textAlign: "center" },
  btn: { marginTop: 20, backgroundColor: colors.red, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 32 },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
