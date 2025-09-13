import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([
    {
      id: '#ORD1234',
      date: '2025-09-05',
      time: '2025-09-05T10:00:00', // 🕒 Order placed time
      items: ['Cheese Burger', 'Fries'],
      total: 1000,
      status: 'Delivered',
    },
    {
      id: '#ORD5678',
      date: '2025-09-10',
      time: new Date().toISOString(), // 🕒 Current time (for demo, allows cancel)
      items: ['Grilled Chicken Burger', 'Coca Cola'],
      total: 1150,
      status: 'On the Way',
    },
  ]);

  // 🔑 Cancel order function
  const cancelOrder = (id: string) => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      { text: 'No' },
      {
        text: 'Yes',
        onPress: () => {
          setOrders(prev =>
            prev.map(order =>
              order.id === id ? { ...order, status: 'Cancelled' } : order
            )
          );
        },
      },
    ]);
  };

  // 🔑 Check if order can be cancelled
  const canCancel = (order: any) => {
    if (order.status !== 'On the Way' && order.status !== 'Pending') return false;
    const orderTime = new Date(order.time).getTime();
    const now = new Date().getTime();
    const diffMins = (now - orderTime) / 1000 / 60; // mins
    return diffMins <= 15; // only within 15 minutes
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 My Orders</Text>
      <Text style={styles.subtext}>Track, Reorder or Cancel your orders</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="file-tray-outline" size={80} color="#aaa" />
          <Text style={styles.emptyText}>No orders found!</Text>
        </View>
      ) : (
        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ paddingBottom: 20 }}>
          {orders.map((order, idx) => (
            <View key={idx} style={styles.orderCard}>
              {/* 🆔 Order ID & Date */}
              <View style={styles.row}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.date}>{order.date}</Text>
              </View>

              {/* 🍔 Items */}
              <Text style={styles.items}>
                {order.items.join(', ')} ({order.items.length} items)
              </Text>

              {/* 💰 Total & Status */}
              <View style={styles.row}>
                <Text style={styles.total}>Rs {order.total}</Text>
                <Text
                  style={[
                    styles.status,
                    order.status === 'Delivered'
                      ? { color: '#4caf50' }
                      : order.status === 'Cancelled'
                      ? { color: '#f44336' }
                      : { color: '#ff9800' },
                  ]}
                >
                  {order.status}
                </Text>
              </View>

              {/* 🔘 Action Buttons */}
              <View style={styles.actionRow}>
                {order.status === 'On the Way' ? (
                  <TouchableOpacity style={styles.trackBtn}>
                    <Text style={styles.trackText}>Track Order</Text>
                  </TouchableOpacity>
                ) : null}

                {canCancel(order) && (
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => cancelOrder(order.id)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                )}

                {order.status === 'Delivered' && (
                  <TouchableOpacity style={styles.reorderBtn}>
                    <Text style={styles.reorderText}>Reorder</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff7043',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtext: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#aaa', marginTop: 8, fontSize: 16 },
  orderCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  orderId: { color: '#ffdd57', fontWeight: 'bold', fontSize: 16 },
  date: { color: '#888', fontSize: 14 },
  items: { color: '#fff', marginTop: 6, fontSize: 14 },
  total: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginTop: 8 },
  status: { fontSize: 15, fontWeight: 'bold', marginTop: 8 },
  actionRow: { marginTop: 10, flexDirection: 'row', gap: 10, justifyContent: 'flex-end' },
  trackBtn: {
    backgroundColor: '#ff9800',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  trackText: { color: '#fff', fontWeight: 'bold' },
  reorderBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  reorderText: { color: '#fff', fontWeight: 'bold' },
  cancelBtn: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelText: { color: '#fff', fontWeight: 'bold' },
});
