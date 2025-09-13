import { SafeAreaView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { signOut } from "firebase/auth";
import { auth } from "@/src/firebaseConfig";

export default function LogoutScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("✅ Logged Out", "You have been logged out successfully.");
      router.replace("/login"); // replace so user cannot go back
    } catch (error: any) {
      Alert.alert("❌ Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.title}>Are you sure you want to logout?</ThemedText>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.cancelText}>Cancel</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#e92142ff",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#666",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelText: {
    color: "#bbb",
    fontSize: 16,
  },
});
