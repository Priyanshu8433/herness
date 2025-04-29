import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Profile() {
  const user = {
    image: require("../../assets/avatars/John-doe.jpg"),
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 84334 34103",
  };

  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfoBox}>
        <Image source={user.image} style={styles.userImage} />

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.mobileText}>{user.phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF9F4",
    padding: 20,
  },
  userInfoBox: {
    alignItems: "center",
    borderBottomColor: "#2D4739",
    borderBottomWidth: 1,
    width: "100%",
    paddingBottom: 10,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 10000,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#e6e0dc",
  },
  userName: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#2D4739",
  },
  userEmail: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#773344",
    marginBottom: 10,
  },
  mobileText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#2D4739",
  },
});
