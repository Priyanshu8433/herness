import { Tabs } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import useFonts from "../../hooks/useFonts";
import { Feather } from "@expo/vector-icons";

function TabIcon({
  focused,
  title,
}: {
  focused: boolean;
  title: "Contacts" | "Home" | "Profile";
}) {
  const obj: Record<
    "Contacts" | "Home" | "Profile",
    "users" | "home" | "user"
  > = {
    Contacts: "users",
    Home: "home",
    Profile: "user",
  };
  const iconName: "users" | "home" | "user" = obj[title];
  if (focused) {
    return (
      <View style={style.iconBackground}>
        <Feather name={iconName} size={20} color="#FFF9F4" />
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontWeight: "500",
            color: "#FFF9F4",
          }}
        >
          {title}
        </Text>
      </View>
    );
  }
  return (
    <View style={style.noFocusIconBackground}>
      <Feather name={iconName} size={20} color="#773344" />
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          color: "#773344",
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default function RootLayout() {
  //////////////////////////
  ///FONTS
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        },
        tabBarStyle: {
          backgroundColor: "#FDCFF3",
          marginBottom: 10,
          marginHorizontal: 20,
          borderRadius: 2000,
          display: "flex",
          height: 60,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Contacts" />
          ),
          tabBarButton: (props) => (
            <TouchableWithoutFeedback {...props}>
              <View>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" />
          ),
          tabBarButton: (props) => (
            <TouchableWithoutFeedback {...props}>
              <View>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Profile" />
          ),
          tabBarButton: (props) => (
            <TouchableWithoutFeedback {...props}>
              <View>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  iconBackground: {
    backgroundColor: "#DE89BE",
    width: 110,
    height: 60,
    borderRadius: 100,
    marginBottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noFocusIconBackground: {
    width: 70,
    height: 40,
    borderRadius: 100,
    marginBottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
