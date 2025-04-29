import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Animated,
  FlatList,
  Linking,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { Vibration } from "react-native";

export default function Index() {
  const sosAlerts = [
    {
      id: "1",
      name: "John Doe",
      email: "b23cs032@nitm.ac.in",
      location: "37.7749,-122.4194",
    },
  ];

  const openGoogleMaps = (location: string) => {
    const url = `https://www.google.com/maps?q=${location}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Google Maps", err)
    );
  };

  const renderSOSItem = ({ item }: { item: (typeof sosAlerts)[0] }) => (
    <View style={style.sosItem}>
      <View>
        <Text style={style.sosName}>{item.name} needs help!</Text>
        <Text style={style.sosEmail}>{item.email}</Text>
      </View>
      <Pressable
        style={style.mapButton}
        onPress={() => openGoogleMaps(item.location)}
      >
        <Feather name="map-pin" size={24} color="black" />
      </Pressable>
    </View>
  );

  /////////////////////////////////////////////
  // Animation
  const [isHolding, setIsHolding] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const circleRef = useRef<any>(null);

  const CIRCLE_LENGTH = 2 * Math.PI * 120;
  const STROKE_WIDTH = 8;

  useEffect(() => {
    progress.addListener((v) => {
      const strokeDashoffset = CIRCLE_LENGTH * (1 - v.value);
      if (circleRef.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progress.removeAllListeners();
    };
  }, []);

  /////////////////////////////////////////////
  // Hold Logic
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    holdTimer.current = setTimeout(() => {
      console.log("🚨 SOS ACTIVATED!");
      Vibration.vibrate(2000);

      // Trigger SOS here
    }, 2000);
  };

  const cancelHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }

    progress.stopAnimation(() => {
      progress.setValue(0);
    });
  };

  ////////////////////////////////
  /// Pulsing Animation
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [isHolding]);

  /////////////////////////////////////////////
  return (
    <View style={style.body}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2D4739"
        hidden={false}
      />

      <View style={style.container}>
        {/* Top Section */}
        <View style={{ width: "100%", borderRadius: 5, gap: 10, height: 300 }}>
          {/* Top Row */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ height: 50, width: 50 }} />
            <View
              style={{
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="message-circle" size={45} color="#2D4739" />
            </View>
          </View>

          {/* SOS List */}
          <View
            style={{
              backgroundColor: "#FFF",
              padding: 10,
              height: 200,
              borderRadius: 23,
            }}
          >
            <FlatList
              data={sosAlerts}
              keyExtractor={(item) => item.id}
              renderItem={renderSOSItem}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                <View style={style.emptyContainer}>
                  <Text style={style.emptyText}>No Active Alerts</Text>
                </View>
              }
            />
          </View>
        </View>

        {/* SOS Button */}
        <View style={{ position: "relative" }}>
          <Pressable
            onPressIn={() => {
              startHold();
              setIsHolding(true);
            }}
            onPressOut={() => {
              cancelHold();
              setIsHolding(false);
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Progress Ring */}
            <Svg width={260} height={260} style={{ position: "absolute" }}>
              <Circle
                cx={130}
                cy={130}
                r={120}
                stroke="#773344"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={CIRCLE_LENGTH}
                strokeDashoffset={CIRCLE_LENGTH}
                ref={circleRef}
              />
            </Svg>

            {/* Pulsing Animation */}
            {!isHolding && (
              <Animated.View
                style={[style.sosBackShadow, { transform: [{ scale }] }]}
              />
            )}

            {/* Center SOS Button */}
            <View style={style.sosBack}>
              <Text style={style.sosText}>SOS</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/////////////////////////////////////////////
const style = StyleSheet.create({
  sosItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "red",
  },
  sosName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#2D4739",
  },
  sosEmail: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#773344",
  },
  mapButton: {
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    backgroundColor: "#FFF9F4",
    paddingBottom: 70,
  },
  container: {
    height: "100%",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
    padding: 10,
  },
  sosBackShadow: {
    backgroundColor: "#e6e0dc",
    opacity: 0.6,
    height: 212,
    width: 212,
    borderRadius: 100000,
    position: "absolute",
  },
  sosBack: {
    height: 200,
    width: 200,
    borderRadius: 1000,
    backgroundColor: "#773344",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  sosText: {
    fontFamily: "Poppins-Bold",
    color: "#FFF9F4",
    fontSize: 60,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#2D4739",
    textAlign: "center",
  },
});
