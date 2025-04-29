import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import useFonts from "@/hooks/useFonts";

export default function Contacts() {
  /////////////////
  ///Fonts
  const fontsLoaded = useFonts();

  const router = useRouter();

  const contacts = [
    { id: "1", name: "John Doe", mobile: "1234567890" },
    { id: "2", name: "Jane Smith", mobile: "9876543210" },
    { id: "3", name: "Alice Brown", mobile: "8765432109" },
    { id: "4", name: "Bob Wilson", mobile: "2345678901" },
    { id: "5", name: "Charlie Garcia", mobile: "7654321098" },
    { id: "6", name: "David Martinez", mobile: "3456789012" },
    { id: "7", name: "Eve Robinson", mobile: "6543210987" },
    { id: "8", name: "Frank Clark", mobile: "4567890123" },
    { id: "9", name: "Grace Lewis", mobile: "5432109876" },
    { id: "10", name: "Henry Lee", mobile: "9012345678" },
  ];

  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 2, borderBottomColor: "#773344" }}>
        <Text style={styles.title}>Emergeny Contacts</Text>
      </View>

      {/* Contacts List */}
      <FlatList
        style={{ marginTop: 20, marginBottom: 70 }}
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Image
              source={require("../../assets/avatars/Jane-smith.jpg")}
              style={{ height: 50, width: 50, borderRadius: 1000 }}
            />

            <View>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactMobile}>{item.mobile}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 70,
            }}
          >
            <Feather name="user-plus" size={54} color="#2D4739" />
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Poppins-Regular",
                fontSize: 24,
                color: "#2D4739",
              }}
            >
              No contacts
            </Text>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/other/add-contact")}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF9F4",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
    color: "#773344",
    textAlign: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 15,
    // borderWidth: 1,
    // borderColor: "#DE89BE",
    borderRadius: 8,
    marginBottom: 5,
    // marginTop: 20,
    // backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e0dc",
  },
  contactName: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#2D4739",
  },
  contactMobile: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: "#773344",
  },
  emptyText: {
    textAlign: "center",
    color: "#ACF39D",
    fontSize: 16,
    marginTop: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 90,
    right: 20,
    backgroundColor: "#DE89BE",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },
});
