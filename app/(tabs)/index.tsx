import { MaterialIcons, Ionicons } from '@expo/vector-icons';  // 👈 Icons
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button,
} from 'react-native';
import { useRouter } from 'expo-router';   // 🚀 Router Import
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { auth } from "../../src/firebaseConfig";

// 📌 Notification handler for foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [loginPressed, setLoginPressed] = useState(false);
  const [registerPressed, setRegisterPressed] = useState(false);
  const [useMenuPressed, setUseMenuPressed] = useState(false);
  const [cartCount, setCartCount] = useState(2);  // 🛒 Cart badge count
  const router = useRouter();   // 🚀 Router Hook

  // 📌 Notification setup
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("📩 Notification Received: ", notification);
    });

    return () => subscription.remove();
  }, []);

  // 📌 Function to schedule local notification
  const handleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🍔 TasteTown Special!",
        body: "Don't miss out on today’s burger offers 🚀",
      },
      trigger: {
        type: "timeInterval",
        seconds: 3,
        repeats: false,
      } as Notifications.TimeIntervalTriggerInput,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      {/* 🔝 Menu Bar */}
      <View style={styles.menuBar}>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <MaterialIcons name="menu" size={30} color="#fdfdfdff" />
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          {/* ✅ Login Button with Notification */}
          <TouchableOpacity
            style={styles.textButton}
            onPressIn={() => setLoginPressed(true)}
            onPressOut={() => setLoginPressed(false)}
            onPress={async () => {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "👋 Welcome Back!",
                  body: "You clicked the Login button 🚀",
                },
                trigger: {
                  type: "timeInterval",
                  seconds: 1,
                  repeats: false,
                } as Notifications.TimeIntervalTriggerInput,
              });
              router.push('/login' as any);
            }}
          >
            <ThemedText
              style={[styles.textButtonText, loginPressed && { color: '#ff3705ff' }]}
            >
              Login
            </ThemedText>
          </TouchableOpacity>

          {/* ✅ Register Button with Notification */}
          <TouchableOpacity
            style={styles.textButton}
            onPressIn={() => setRegisterPressed(true)}
            onPressOut={() => setRegisterPressed(false)}
            onPress={async () => {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "📝 Register Now!",
                  body: "Thanks for joining TasteTown 🚀",
                },
                trigger: {
                  type: "timeInterval",
                  seconds: 1,
                  repeats: false,
                } as Notifications.TimeIntervalTriggerInput,
              });
              router.push('/register' as any);
            }}
          >
            <ThemedText
              style={[styles.textButtonText, registerPressed && { color: '#f42004ff' }]}
            >
              Register
            </ThemedText>
          </TouchableOpacity>

          {/* 🛒 Cart Icon with Badge */}
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push('/cart' as any)}
          >
            <Ionicons name="cart-outline" size={28} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {menuVisible && (
          <View style={styles.dropdown}>
            {[
              { name: 'FAQ', path: '/faq' },
              { name: 'Service', path: '/service' },
              { name: 'Log Out', path: '/logout' },
            ].map(option => (
              <TouchableOpacity
                key={option.name}
                style={styles.option}
                onPress={() => {
                  setMenuVisible(false);
                  router.push(option.path as any);
                }}
              >
                <ThemedText style={styles.optionText}>{option.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* 🔽 Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔍 Search */}
        <ThemedView style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search your burger..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
        </ThemedView>

        {/* 🔥 Featured Burgers */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.centeredSectionTitle}>
            Featured Burgers
          </ThemedText>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
            {[
              require('@/assets/images/download.jpeg'),
              require('@/assets/images/download (1).jpeg'),
              require('@/assets/images/download (2).jpeg'),
            ].map((img, index) => (
              <View key={index} style={styles.burgerCard}>
                <Image source={img} style={styles.burgerImage} />

                <TouchableOpacity
                  style={styles.imageButton}
                  onPress={() => alert(`Clicked Burger ${index + 1}`)}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Order</Text>
                </TouchableOpacity>

                <ThemedText style={styles.burgerName}>Burger {index + 1}</ThemedText>
              </View>
            ))}
          </ScrollView>

          {/* 🚀 Navigate to Menu Page */}
          <TouchableOpacity
            onPressIn={() => setUseMenuPressed(true)}
            onPressOut={() => setUseMenuPressed(false)}
            onPress={() => router.push('/menu' as any)}
            style={{ alignSelf: 'center', marginTop: 12 }}
          >
            <ThemedText
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: useMenuPressed ? '#aaa' : '#ff6347',
              }}
            >
              Use Menu
            </ThemedText>
          </TouchableOpacity>

          {/* 🔔 Notification Button */}
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Button title="Send Local Notification" onPress={handleNotification} />
          </View>
        </ThemedView>

        {/* 🍴 Categories */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.centeredSectionTitle}>
            Categories
          </ThemedText>

          {[
            { name: 'Burgers', image: require('@/assets/images/download (3).jpeg'), path: '/categories/burgers' },
            { name: 'Fries', image: require('@/assets/images/fries.jpeg'), path: '/categories/fries' },
            { name: 'Drinks', image: require('@/assets/images/drinks.jpeg'), path: '/categories/drinks' },
            { name: 'Sandwich', image: require('@/assets/images/Sandwich.jpeg'), path: '/categories/sandwich' },
            { name: 'Ice Cream', image: require('@/assets/images/Icecream.jpeg'), path: '/categories/icecream' },
          ].map((category, idx) => (
            <View key={idx} style={styles.categoryCard}>
              <Image source={category.image} style={styles.categoryPic} />

              <View style={styles.categoryInfo}>
                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                <TouchableOpacity onPress={() => router.push(category.path as any)}>
                  <Text style={styles.categoryView}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ThemedView>

        {/* 🆕 New Arrivals */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.centeredSectionTitle}>
            New Arrivals
          </ThemedText>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
            {[
              { name: 'Cheese Burger', price: '$5.99', qty: 12, image: require('@/assets/images/download.jpeg') },
              { name: 'Veggie Delight', price: '$4.49', qty: 8, image: require('@/assets/images/download (1).jpeg') },
              { name: 'Double Patty', price: '$7.25', qty: 5, image: require('@/assets/images/download (2).jpeg') },
            ].map((item, index) => (
              <View key={index} style={styles.arrivalCard}>
                <Image source={item.image} style={styles.arrivalImage} />

                <ThemedText style={styles.arrivalName}>{item.name}</ThemedText>
                <Text style={styles.arrivalPrice}>{item.price}</Text>
                <Text style={styles.arrivalQty}>Available: {item.qty}</Text>

                <TouchableOpacity onPress={() => alert(`Buying ${item.name}`)}>
                  <Text style={styles.arrivalButton}>Buy</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={() => router.push('/arrivals' as any)}>
            <ThemedText style={styles.newArrivalsButton}>
              View All New Arrivals →
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

// 📌 Register notification permissions
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('⚠️ Failed to get push token for notifications!');
      return;
    }
  } else {
    alert('⚠️ Must use physical device for Push Notifications');
  }
}

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#181a20',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2d34',
    zIndex: 18,
  },
  rightButtons: { flexDirection: 'row', alignItems: 'center' },
  textButton: { marginLeft: 12, paddingVertical: 6, borderRadius: 8 },
  textButtonText: { color: '#fff', fontWeight: '600' },
  cartButton: { marginLeft: 16, position: 'relative' },
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: '#ff3705ff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: '#242732',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 100,
  },
  option: { paddingVertical: 6 },
  optionText: { color: '#ddd', fontSize: 16 },
  searchContainer: { marginVertical: 12, paddingHorizontal: 16 },
  searchInput: {
    borderRadius: 14,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  sectionContainer: {
    gap: 14,
    marginBottom: 28,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
  },
  centeredSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#ffdd57',
  },
  burgerCard: {
    backgroundColor: '#242732',
    borderRadius: 18,
    marginRight: 16,
    padding: 14,
    minWidth: 180,
    minHeight: 160,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative',
  },
  burgerImage: { width: 160, height: 120, borderRadius: 12, marginBottom: 6 },
  burgerName: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  imageButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#ff3705ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242732',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    marginBottom: 14,
  },
  categoryPic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  categoryName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  categoryView: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  newArrivalsButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6347',
    textAlign: 'center',
    marginTop: 8,
  },
  arrivalCard: {
    backgroundColor: '#242732',
    borderRadius: 18,
    marginRight: 16,
    padding: 14,
    minWidth: 150,
    minHeight: 170,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  arrivalImage: {
    width: 120,
    height: 90,
    borderRadius: 12,
    marginBottom: 6,
  },
  arrivalName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 6,
  },
  arrivalPrice: {
    color: '#ffdd57',
    fontSize: 13,
    marginTop: 2,
  },
  arrivalQty: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  arrivalButton: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#28a745',
  },
});
