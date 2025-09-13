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
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// ✅ Firebase imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/firebaseConfig"; // make sure path is correct

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("⚠️ Missing Fields", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("✅ Login Successful", `Welcome back, ${email}`);
      router.push("/account"); // Navigate after login
    } catch (error: any) {
      Alert.alert("❌ Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 📝 Title */}
      <ThemedText style={styles.title}>Welcome Back 👋</ThemedText>
      <ThemedText style={styles.subtitle}>
        Login to continue ordering your favorite burgers
      </ThemedText>

      {/* 🔐 Login Form */}
      <ThemedView style={styles.form}>
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
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <ThemedText style={styles.loginText}>
            {loading ? "Logging in..." : "Login"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* 🔗 Register Redirect */}
      <View style={styles.registerRow}>
        <ThemedText style={styles.registerPrompt}>
          Don’t have an account?
        </ThemedText>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <ThemedText style={styles.registerLink}> Register</ThemedText>
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
  loginButton: {
    backgroundColor: "#ff6347",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerPrompt: {
    color: "#fff",
    fontSize: 14,
  },
  registerLink: {
    color: "#ff6347",
    fontSize: 14,
    fontWeight: "bold",
  },
});
