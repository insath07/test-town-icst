import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* 👤 Profile Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={90} color="#ff7043" />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* ⚙️ Profile Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {/* Account option with navigation */}
        <Option icon="person-outline" label="Account" onPress={() => router.push('/account')} />
        {/* My Orders option with navigation */}
        <Option icon="receipt-outline" label="My Orders" onPress={() => router.push('/orders')} />
        {/* My Cart option with navigation */}
        <Option icon="cart-outline" label="My Cart" onPress={() => router.push('/cart')} />
        <Option icon="heart-outline" label="Wishlist" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Option icon="key-outline" label="Change Password" />
        <Option icon="card-outline" label="Payment Methods" />
        <Option icon="help-circle-outline" label="Support" />
      </View>

      {/* 🚪 Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Option({ icon, label, onPress }: { icon: any; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#ff7043" />
      <Text style={styles.optionText}>{label}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#aaa" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  email: { fontSize: 14, color: '#bbb', marginTop: 4 },
  phone: { fontSize: 14, color: '#bbb', marginTop: 2 },
  editBtn: {
    marginTop: 12,
    backgroundColor: '#ff7043',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editText: { color: '#fff', fontWeight: 'bold' },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionTitle: { color: '#ffdd57', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  optionText: { flex: 1, marginLeft: 12, fontSize: 16, color: '#fff' },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    padding: 14,
    borderRadius: 12,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
});
