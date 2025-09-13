import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ServiceScreen() {
  const router = useRouter();

  const openEmail = () => {
    Linking.openURL('mailto:support@foodapp.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+911234567890');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Back Button (Only Text) */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* 🚀 Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Customer Service</Text>
        <Text style={styles.subtitle}>We’re here to help you anytime 🚀</Text>

        {/* 📞 Contact Options */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📞 Call Us</Text>
          <TouchableOpacity onPress={openPhone}>
            <Text style={styles.link}>+94 776547269</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📧 Email Us</Text>
          <TouchableOpacity onPress={openEmail}>
            <Text style={styles.link}>support@foodapp.com</Text>
          </TouchableOpacity>
        </View>

        {/* ❓ FAQ Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>❓ Frequently Asked Questions</Text>
          {[
            {
              q: 'How do I track my order?',
              a: 'Go to Orders tab → Select your order → Track.',
            },
            {
              q: 'How can I cancel my order?',
              a: 'Orders can be cancelled within 5 minutes of placing.',
            },
            {
              q: 'Do you offer refunds?',
              a: 'Yes, refunds are processed within 3–5 business days.',
            },
          ].map((faq, idx) => (
            <View key={idx} style={styles.faqBox}>
              <Text style={styles.faqQ}>• {faq.q}</Text>
              <Text style={styles.faqA}>{faq.a}</Text>
            </View>
          ))}
        </View>

        {/* 🟠 Live Chat / Support */}
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() => alert('Live Chat Coming Soon 🚀')}
        >
          <Text style={styles.chatText}>💬 Start Live Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    color: '#fff', // ✅ white color
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 25, // 👈 Back இன்னும் கீழே வரும்
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffdd57',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff7043',
    marginBottom: 10,
  },
  link: {
    color: '#ffdd57',
    fontSize: 16,
    fontWeight: '600',
  },
  faqBox: {
    marginBottom: 12,
  },
  faqQ: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  faqA: {
    color: '#bbb',
    fontSize: 14,
    marginLeft: 12,
  },
  chatBtn: {
    marginTop: 20,
    backgroundColor: '#ff7043',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  chatText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
