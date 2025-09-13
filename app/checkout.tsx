import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>('card');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* 🔙 Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* 📦 Title */}
        <Text style={styles.headerTitle}>Checkout</Text>

        {/* 🛒 Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {[
            { name: 'Spicy Beef Burger', qty: 1, price: 750 },
            { name: 'French Fries', qty: 2, price: 500 },
          ].map((item, idx) => (
            <View key={idx} style={styles.orderItem}>
              <Text style={styles.itemName}>
                {item.name} x{item.qty}
              </Text>
              <Text style={styles.itemPrice}>Rs {item.price * item.qty}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.orderItem}>
            <Text style={[styles.itemName, { fontWeight: 'bold' }]}>Total</Text>
            <Text style={[styles.itemPrice, { fontWeight: 'bold' }]}>
              Rs 1,750
            </Text>
          </View>
        </View>

        {/* 📍 Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full address"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
        </View>

        {/* 💳 Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {[
            { key: 'card', label: 'Credit / Debit Card', icon: 'card-outline' },
            { key: 'upi', label: 'UPI / Wallet', icon: 'phone-portrait-outline' },
            { key: 'cod', label: 'Cash on Delivery', icon: 'cash-outline' },
          ].map((method) => (
            <TouchableOpacity
              key={method.key}
              style={[
                styles.paymentOption,
                selectedPayment === method.key && styles.paymentSelected,
              ]}
              onPress={() => setSelectedPayment(method.key)}
            >
              <Ionicons
                name={method.icon as any}
                size={22}
                color={selectedPayment === method.key ? '#ff7043' : '#bbb'}
              />
              <Text
                style={[
                  styles.paymentText,
                  selectedPayment === method.key && { color: '#ff7043' },
                ]}
              >
                {method.label}
              </Text>
              {selectedPayment === method.key && (
                <MaterialIcons name="check-circle" size={22} color="#ff7043" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* 🚀 Place Order */}
        <TouchableOpacity style={styles.placeOrderBtn}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 30, // back button இன்னும் கீழே
  },
  backText: {
    color: '#fff', // White color
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5, // back text கீழே margin
  },
  headerTitle: {
    color: '#ffdd57', // Yellow color
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30, // title இன்னும் கீழே
    marginBottom: 15,
  },
  section: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2a2d34',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffdd57',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: { color: '#fff', fontSize: 15 },
  itemPrice: { color: '#fff', fontSize: 15 },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 8,
  },
  input: {
    backgroundColor: '#242732',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242732',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'space-between',
  },
  paymentSelected: { borderColor: '#ff7043', backgroundColor: '#2a2d34' },
  paymentText: { flex: 1, marginLeft: 10, fontSize: 15, color: '#fff' },
  placeOrderBtn: {
    backgroundColor: '#ff7043',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
