import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

type ArrivalItem = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const arrivalsData: ArrivalItem[] = [
  {
    id: "1",
    title: "Crispy Fries",
    description: "Golden & crunchy fries with seasoning.",
    image: require("../assets/images/fries.jpeg"),
  },
  {
    id: "2",
    title: "Refreshing Drinks",
    description: "Cool down with fresh juices & soft drinks.",
    image: require("../assets/images/drinks.jpeg"),
  },
  {
    id: "3",
    title: "Cheese Burger",
    description: "Juicy burger loaded with cheese & veggies.",
    image: require("../assets/images/download.jpeg"),
  },
  {
    id: "4",
    title: "Ice Creams",
    description: "Delicious scoops in multiple flavors.",
    image: require("../assets/images/Icecream.jpeg"),
  },
  {
    id: "5",
    title: "Sandwiches",
    description: "Fresh sandwiches with healthy fillings.",
    image: require("../assets/images/Sandwich.jpeg"),
  },
  {
    id: "6",
    title: "Special Wrap",
    description: "Grilled wraps with sauces & toppings.",
    image: require("../assets/images/download (1).jpeg"),
  },
];

export default function ArrivalsScreen() {
  const renderItem = ({ item }: { item: ArrivalItem }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>✨ New Arrivals ✨</Text>

      {/* Grid list */}
      <FlatList
        data={arrivalsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const CARD_WIDTH = width / 2 - 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffdd57",
    textAlign: "center",
    marginVertical: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    marginBottom: 16,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2d34",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#bbb",
    lineHeight: 18,
  },
});
