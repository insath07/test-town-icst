import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function DrinksPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  const drinks = [
    { name: 'Coke', price: 120, stock: 20, image: require('@/assets/images/drinks.jpeg') },
    { name: 'Pepsi', price: 120, stock: 18, image: require('@/assets/images/drinks.jpeg') },
    { name: 'Fresh Juice', price: 200, stock: 10, image: require('@/assets/images/drinks.jpeg') },
  ];

  const [quantities, setQuantities] = useState(drinks.map(() => 1));

  const increaseQty = (index: number, stock: number) => {
    setQuantities(prev => {
      const updated = [...prev];
      if (updated[index] < stock) updated[index] += 1;
      return updated;
    });
  };

  const decreaseQty = (index: number) => {
    setQuantities(prev => {
      const updated = [...prev];
      if (updated[index] > 1) updated[index] -= 1;
      return updated;
    });
  };

  const addToCart = (item: any, index: number) => {
    const quantity = quantities[index];
    const total = item.price * quantity;
    setCart(prev => [...prev, { ...item, quantity, total }]);
    alert(`${item.name} (${quantity}) added to cart!`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* 🔙 Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={styles.backText}> Back</ThemedText>
        </TouchableOpacity>

        {/* 🥤 Title */}
        <ThemedText type="title" style={styles.title}>
          🥤 Drinks Menu
        </ThemedText>

        {/* Drinks List */}
        {drinks.map((item, idx) => (
          <ThemedView key={idx} style={styles.card}>
            <Image source={item.image} style={styles.drinkImage} />
            <ThemedView style={{ flex: 1 }}>
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemPrice}>Rs {item.price}</ThemedText>
              <ThemedText style={styles.stock}>Available: {item.stock}</ThemedText>

              {/* Quantity Selector */}
              <View style={styles.qtyRow}>
                <TouchableOpacity onPress={() => decreaseQty(idx)} style={styles.qtyBtn}>
                  <ThemedText style={styles.qtyBtnText}>-</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.qtyText}>{quantities[idx]}</ThemedText>
                <TouchableOpacity onPress={() => increaseQty(idx, item.stock)} style={styles.qtyBtn}>
                  <ThemedText style={styles.qtyBtnText}>+</ThemedText>
                </TouchableOpacity>
              </View>

              {/* Order Button */}
              <TouchableOpacity style={styles.orderBtn} onPress={() => addToCart(item, idx)}>
                <ThemedText style={styles.orderBtnText}>🛒 Order Now</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        ))}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <ThemedView style={styles.cartBox}>
            <ThemedText type="subtitle" style={{ color: '#ffdd57', marginBottom: 8 }}>
              🛍️ Your Cart
            </ThemedText>
            {cart.map((item, i) => (
              <ThemedText key={i} style={{ color: '#fff' }}>
                {item.quantity} × {item.name} = Rs {item.total}
              </ThemedText>
            ))}
          </ThemedView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  backBtn: { marginTop: 20, marginBottom: 10 },
  backText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffdd57',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1f26',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2a2d34',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    gap: 14,
  },
  drinkImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#ff6347',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stock: { color: '#aaa', fontSize: 14, marginBottom: 6 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  qtyBtn: { backgroundColor: '#333', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  qtyBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  qtyText: { color: '#fff', fontSize: 16, fontWeight: '600', minWidth: 20, textAlign: 'center' },
  orderBtn: {
    marginTop: 6,
    backgroundColor: '#ff6347',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  orderBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cartBox: { marginTop: 30, padding: 16, borderRadius: 12, backgroundColor: '#222' },
});
