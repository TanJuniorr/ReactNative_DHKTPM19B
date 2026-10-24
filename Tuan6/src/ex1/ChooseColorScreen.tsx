import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { ColorKey } from "../types";
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {/* TODO 3: Show additional info when color is picked */}
          {picked !== undefined && (
            <>
              <Text style={styles.detail}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.detail}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={[styles.detail, styles.bold]}>
                {formatPrice(phone.price)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: Done button */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked })}
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-start",
  },
  thumb: { width: 100, height: 120, marginRight: 12 },
  headerText: { flex: 1, paddingTop: 4 },
  small: { fontSize: 14, color: colors.text, marginBottom: 2 },
  detail: { fontSize: 13, color: colors.text, marginTop: 4 },
  bold: { fontWeight: "bold" },
  body: {
    flex: 1,
    backgroundColor: colors.grey,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  hint: { fontSize: 14, color: colors.text, marginBottom: 16, alignSelf: "flex-start" },
  swatches: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  swatch: {
    width: 70,
    height: 40,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  swatchOn: {
    borderColor: "#fff",
    borderWidth: 3,
  },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 60,
    alignItems: "center",
    marginTop: "auto",
  },
  doneBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
