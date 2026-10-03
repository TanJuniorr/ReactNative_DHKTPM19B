// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Tích hợp đầy đủ 4 tab: Trang chủ (Giờ 4), Danh mục (Giờ 2), Giỏ hàng (Giờ 5),
// Tài khoản (placeholder). Tab Trang chủ có "stack" nội bộ: HomeScreen ↔ BookDetailScreen
// chuyển bằng useState (không dùng thư viện navigation — đúng tinh thần tài liệu).
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { CartScreen } from './screens/CartScreen';
import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // --- State cho tab "Trang chủ": stack nội bộ HomeScreen ↔ BookDetailScreen ---
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(CART_ITEMS.length);

  // Khi đổi tab, reset stack nội bộ của Home về trang chính
  const handleTabChange = (key: TabKey) => {
    if (key !== 'home') setSelectedBookId(null);
    setActiveTab(key);
  };

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  // --- Render nội dung theo tab đang chọn ---
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        // Stack nội bộ: nếu đã chọn sách -> hiển thị chi tiết, ngược lại -> trang chủ
        if (selectedBook) {
          return (
            <BookDetailScreen
              book={selectedBook}
              onBack={() => setSelectedBookId(null)}
              onAddToCart={() => setCartCount((n) => n + 1)}
            />
          );
        }
        return (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => handleTabChange('cart')}
          />
        );

      case 'category':
        return (
          <CategoryScreen
            onPressBook={(id) => {
              setSelectedBookId(id);
              setActiveTab('home'); // chuyển sang tab Home để xem chi tiết
            }}
          />
        );

      case 'cart':
        return <CartScreen items={CART_ITEMS} />;

      case 'account':
        return <Placeholder />;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* flex:1 -> containing block cho TabBar (position:'absolute') bên dưới */}
      <View style={styles.body}>
        {renderContent()}
        <TabBar active={activeTab} onChange={handleTabChange} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>
        Tài liệu gốc không mô tả tab này, để trống.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
});
