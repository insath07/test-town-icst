import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen() {
  const router = useRouter();

  // 🛒 Sample cart items
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Cheese Burger",
      price: 750,
      qty: 1,
      image: require("@/assets/images/download.jpeg"),
    },
    {
      id: 2,
      name: "French Fries",
      price: 250,
      qty: 2,
      image: require("@/assets/images/fries.jpeg"),
    },
    {
      id: 3,
      name: "Coca Cola",
      price: 120,
      qty: 1,
      image: require("@/assets/images/drinks.jpeg"),
    },
  ]);

  // ➕ Increase Quantity
  const increaseQty = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // ➖ Decrease Quantity
  const decreaseQty = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // ❌ Remove Item
  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 💰 Calculate Totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const delivery = subtotal > 0 ? 100 : 0; // flat delivery
  const total = subtotal + tax + delivery;

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Cart</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#888" />
          <Text style={{ color: "#aaa", marginTop: 10, fontSize: 16 }}>
            Your cart is empty!
          </Text>
        </View>
      ) : (
        <>
          {/* 🔽 Cart Items List */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
          >
            {cart.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                {/* 📸 Product Image */}
                <Image source={item.image} style={styles.itemImage} />

                {/* 📄 Item Details */}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.price}>Rs {item.price}</Text>

                  {/* 🔢 Quantity Controls */}
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => decreaseQty(item.id)}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyCount}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => increaseQty(item.id)}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* ❌ Remove Button */}
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="#ff5252" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* 💰 Price Summary */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryText}>Rs {subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Tax (5%)</Text>
              <Text style={styles.summaryText}>Rs {tax}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Delivery</Text>
              <Text style={styles.summaryText}>Rs {delivery}</Text>
            </View>
            <View
              style={[
                styles.summaryRow,
                {
                  borderTopWidth: 1,
                  borderColor: "#333",
                  marginTop: 8,
                  paddingTop: 8,
                },
              ]}
            >
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>Rs {total}</Text>
            </View>
          </View>

          {/* 🟠 Checkout Button */}
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => router.push("/checkout")} // ✅ Navigate to checkout.tsx
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 16,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffdd57",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cartList: {
    flexGrow: 1,
    gap: 12,
    paddingBottom: 20,
  },
  cartItem: {
    backgroundColor: "#1f1f1f",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    color: "#ff7043",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyButton: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyText: {
    color: "#fff",
    fontSize: 16,
  },
  qtyCount: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
  },
  summaryBox: {
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryText: {
    color: "#bbb",
    fontSize: 15,
  },
  totalText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  checkoutBtn: {
    marginBottom: 40,
    backgroundColor: "#ff7043",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
