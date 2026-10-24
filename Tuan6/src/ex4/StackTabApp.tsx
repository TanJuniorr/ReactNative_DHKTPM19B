import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { FavoritesProvider } from "./FavoritesContext";
import { ProductsTab } from "./ProductsTab";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import type { RootStackParamList, TabParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Products: ["list", "list-outline"],
  Favorites: ["heart", "heart-outline"],
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={TAB_ICONS[route.name][focused ? 0 : 1]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{ title: "Sản phẩm" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{ title: "Yêu thích" }}
      />
    </Tab.Navigator>
  );
}

export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ title: "Cửa hàng" }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
