import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "🍔 What types of burgers do you offer?",
    answer:
      "We serve a variety of burgers including beef, chicken, and veggie options with customizable toppings.",
  },
  {
    question: "🥤 Do you provide drinks?",
    answer:
      "Yes! We offer soft drinks, juices, and milkshakes. Note: We do not serve alcoholic beverages.",
  },
  {
    question: "🍦 Do you have ice creams?",
    answer:
      "Yes, we provide different flavors of ice cream including vanilla, chocolate, and seasonal specials.",
  },
  {
    question: "🥪 Do you serve sandwiches?",
    answer:
      "Yes, we have fresh sandwiches made with a variety of fillings such as grilled chicken, cheese, and veggies.",
  },
  {
    question: "🍟 What about fries?",
    answer:
      "We serve crispy French fries, peri-peri fries, and loaded cheese fries.",
  },
  {
    question: "🚚 How does delivery work?",
    answer:
      "You can place an order through our app, and our delivery partners will deliver it safely to your doorstep.",
  },
  {
    question: "🕒 What are your shop opening days?",
    answer: "We are open every day from 10 AM to 11 PM, including weekends.",
  },
  {
    question: "📧 How can I change my email?",
    answer:
      "Go to your profile settings > Edit Profile > Change Email and verify with OTP.",
  },
  {
    question: "📱 How can I change my phone number?",
    answer:
      "In your profile settings, choose 'Update Phone Number'. You will need to verify with an OTP.",
  },
  {
    question: "🔑 How can I change my password?",
    answer:
      "Go to Settings > Security > Change Password. Enter your old password and set a new one.",
  },
  {
    question: "💳 How can I update my payment details?",
    answer:
      "In your profile settings, select 'Payment Methods'. You can add or remove cards and UPI IDs.",
  },
  {
    question: "🔒 Are my personal details safe?",
    answer:
      "Yes, your data is encrypted and secured. We never share your details with third parties.",
  },
  {
    question: "❓ I have another question. What should I do?",
    answer:
      "You can contact our support team anytime at support@foodapp.com or call us at +91 9876543210.",
  },
];

export default function FAQScreen() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const toggleExpand = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* ❓ Title */}
      <Text style={styles.title}>FAQ</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionRow}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={activeIndex === index ? "chevron-up" : "chevron-down"}
                size={20}
                color="#ffdd57"
              />
            </TouchableOpacity>
            {activeIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingHorizontal: 16 },
  backButton: {
    marginTop: 20, // 👈 back கீழே வரும்
    marginBottom: 10,
  },
  backText: {
    color: "#fff", // 👈 back white color
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25, // 👈 Back இன்னும் கீழே வரும்
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffdd57", // 👈 yellow color
    textAlign: "center",
    marginTop: 15, // 👈 title கீழே வரும்
    marginBottom: 20,
  },
  faqItem: {
    backgroundColor: "#1a1a1a",
    marginBottom: 12,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2a2d34",
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: { fontSize: 16, fontWeight: "600", color: "#fff", flex: 1 },
  answer: {
    marginTop: 10,
    fontSize: 14,
    color: "#bbb",
    lineHeight: 20,
  },
});
