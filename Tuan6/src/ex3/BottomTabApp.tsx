import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.cardText}>{item.name.split(" - ")[0]}</Text>
        </View>
      )}
    />
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState("");

  const filtered = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <View style={s.flex}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />
      {filtered.length === 0 ? (
        <View style={s.emptyWrap}>
          <Text style={s.emptyText}>Không có kết quả cho "{keyword}"</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.cardText}>{item.name.split(" - ")[0]}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

function ProfileTab() {
  return (
    <View style={s.profileCenter}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={s.profileName}>Lê Nhật Tân</Text>
      <Text style={s.profileEmail}>tan.Le@example.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
  card: {
    backgroundColor: colors.bg,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardText: { fontSize: 15, color: colors.text },
  input: {
    margin: 16,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  emptyWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 15, color: colors.muted },
  profileCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { fontSize: 36, color: "#fff", fontWeight: "bold" },
  profileName: { fontSize: 22, fontWeight: "bold", color: colors.text },
  profileEmail: { fontSize: 14, color: colors.muted, marginTop: 4 },
});
