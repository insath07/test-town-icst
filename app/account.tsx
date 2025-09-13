import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [mobile, setMobile] = useState('+94 776547269');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    alert('Profile Updated ✅');
    router.back(); // back to Account screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>✏️ Edit Profile</Text>

        {/* 🔹 Name */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#777"
          />
        </View>

        {/* 🔹 Email */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#777"
            keyboardType="email-address"
          />
        </View>

        {/* 🔹 Mobile */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter your mobile number"
            placeholderTextColor="#777"
            keyboardType="phone-pad"
          />
        </View>

        {/* 🔹 Password */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Change Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter new password"
            placeholderTextColor="#777"
            secureTextEntry
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>💾 Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  backBtn: {
    marginBottom: 16,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffdd57',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputBox: {
    marginBottom: 16,
  },
  label: {
    color: '#ff7043',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1f1f1f',
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  saveBtn: {
    marginTop: 30,
    backgroundColor: '#ff7043',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
