import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

export default function MenuPage() {
  const router = useRouter();

  const menuItems = [
    { name: "Cheese Burger", price: "Rs 500", image: require("@/assets/images/download.jpeg") },
    { name: "Chicken Burger", price: "Rs 650", image: require("@/assets/images/download (1).jpeg") },
    { name: "Beef Burger", price: "Rs 750", image: require("@/assets/images/download (2).jpeg") },
    { name: "Fries", price: "Rs 250", image: require("@/assets/images/fries.jpeg") },
    { name: "Ice Cream", price: "Rs 300", image: require("@/assets/images/Icecream.jpeg") },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* 🟡 Title */}
        <ThemedText type="title" style={styles.title}>Menu</ThemedText>

        {menuItems.map((item, idx) => (
          <ThemedView key={idx} style={styles.menuItem}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.price}>{item.price}</ThemedText>
            </View>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Add</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 8, // 🔑 title konjam keela varum
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: "#ffdd57",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242732",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#333",
  },
  image: { width: 70, height: 70, borderRadius: 12, marginRight: 12 },
  name: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  price: { color: "#aaa", fontSize: 14 },
  button: { backgroundColor: "#ff6347", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
