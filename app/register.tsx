import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// ✅ Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/firebaseConfig"; // adjust path if needed

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name || !mobile) {
      Alert.alert("⚠️ Missing Fields", "Please fill all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("❌ Error", "Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("✅ Success", "Account created successfully!");
      router.push("/account"); // navigate after register
    } catch (error: any) {
      Alert.alert("❌ Registration Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // Placeholder: actual Google Auth requires expo-auth-session or firebase sdk
    console.log("Google Register Success ✅");
    Alert.alert("Google", "Logged in with Google ✅");
    router.push("/account");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 📝 Title */}
      <ThemedText style={styles.title}>Create Account ✨</ThemedText>
      <ThemedText style={styles.subtitle}>
        Fill the details below to register
      </ThemedText>

      {/* 📝 Register Form */}
      <ThemedView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#888"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.registerButton, loading && { opacity: 0.6 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          <ThemedText style={styles.registerText}>
            {loading ? "Registering..." : "Register"}
          </ThemedText>
        </TouchableOpacity>

        {/* 🌐 Google Register Button with Icon */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleRegister}
        >
          <Ionicons name="logo-google" size={20} color="#fff" />
          <ThemedText style={styles.googleText}>
            Continue with Google
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* 🔗 Already have account → Login */}
      <View style={styles.loginRow}>
        <ThemedText style={styles.loginPrompt}>
          Already have an account?
        </ThemedText>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <ThemedText style={styles.loginLink}> Login</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#bbb",
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 16,
  },
  input: {
    backgroundColor: "#22252e",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    color: "#fff",
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: "#e92142ff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eb1e588e",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  googleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginPrompt: {
    color: "#fff",
    fontSize: 14,
  },
  loginLink: {
    color: "#ff6347",
    fontSize: 14,
    fontWeight: "bold",
  },
});
