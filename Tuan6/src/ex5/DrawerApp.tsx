import React, { useState, createContext, useContext, useMemo } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

// Context for settings (TODO 3 - advanced)
interface SettingsCtx {
  notify: boolean;
  setNotify: (v: boolean) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
}
const SettingsContext = createContext<SettingsCtx>({
  notify: true,
  setNotify: () => {},
  dark: false,
  setDark: () => {},
});

const ICONS: Record<
  keyof DrawerParamList,
  keyof typeof Ionicons.glyphMap
> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

function HomeScreen() {
  const { dark } = useContext(SettingsContext);
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <Text style={[s.big, dark && s.darkText]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useContext(SettingsContext);
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, dark && s.darkText]}>Lê Nhật Tân</Text>
      <Text style={[s.muted, dark && s.darkMuted]}>tan.Le@example.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useContext(SettingsContext);

  return (
    <View style={[s.settings, dark && s.darkBg]}>
      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && s.darkText]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && s.darkText]}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={[s.status, dark && s.darkMuted]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const ctx = useMemo(() => ({ notify, setNotify, dark, setDark }), [notify, dark]);

  return (
    <SettingsContext.Provider value={ctx}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => (
              <Ionicons name={ICONS[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Trang chủ" }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Cá nhân" }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Cài đặt" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  big: { fontSize: 28, fontWeight: "bold", color: colors.text },
  muted: { fontSize: 14, color: colors.muted, marginTop: 4 },
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
  settings: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  settingLabel: { fontSize: 16, color: colors.text },
  status: {
    marginTop: 24,
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
  },
  darkBg: { backgroundColor: "#1a1a2e" },
  darkText: { color: "#eee" },
  darkMuted: { color: "#999" },
});
