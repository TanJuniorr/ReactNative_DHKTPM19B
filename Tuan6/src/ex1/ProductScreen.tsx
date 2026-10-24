import React from "react";
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
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.questionCircle}>
            <Text style={styles.questionText}>?</Text>
          </View>
        </View>

        {/* TODO 1: Color choose button */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {phone.colors.length} MÀU-{picked ? "CHỌN LOẠI" : "CHỌN MÀU"}
          </Text>
          <Text style={styles.chooseBtnArrow}>{">"}</Text>
        </Pressable>
      </View>

      {/* TODO 2: Buy button */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyBtnText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  imageWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "80%", height: "80%" },
  info: { paddingBottom: 12 },
  name: { fontSize: 15, color: colors.text, marginBottom: 6 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  review: { fontSize: 13, color: colors.muted, marginLeft: 6 },
  price: { fontSize: 18, fontWeight: "bold", color: colors.red, marginRight: 8 },
  oldPrice: { fontSize: 14, color: colors.muted, textDecorationLine: "line-through" },
  badge: { fontSize: 11, fontWeight: "bold", color: colors.red },
  questionCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  questionText: { fontSize: 11, color: colors.muted, fontWeight: "bold" },
  chooseBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  chooseBtnText: { fontSize: 13, color: colors.text, fontWeight: "500" },
  chooseBtnArrow: { position: "absolute", right: 12, fontSize: 16, color: colors.muted },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  buyBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
