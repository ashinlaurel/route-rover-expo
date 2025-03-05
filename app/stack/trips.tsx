import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

export default function TripScreen() {
  const router = useRouter();
  const styles = useThemedStyles();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <KeyboardAvoidingView className={`flex-1 ${styles.bgPrimary}`}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#111827" : "#FFFFFF"}
      />
      {/* Header */}
      <View className="p-5 flex-row items-center justify-between">
        <View>
          <Text className={`text-2xl font-medium ${styles.textPrimary}`}>
            Agra Trip 2024
          </Text>
          <Text className={styles.textSecondary}>The trip at a glance</Text>
        </View>
        <TouchableOpacity
          onPress={toggleDarkMode}
          className={`${styles.bgSecondary} p-2 rounded-full`}
        >
          <Ionicons
            name={isDarkMode ? "sunny-outline" : "moon-outline"}
            size={20}
            color={styles.iconColor}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="">
        {/* Trip Selection Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 mb-6 max-h-14"
        >
          {["Day 1", "Day 2", "Day 3", "Day 4"].map(
            (day, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-3 mr-3 rounded-full ${
                  day === "Day 1"
                    ? styles.buttonPrimary
                    : `${styles.bgPrimary} border ${styles.borderColor}`
                }`}
                style={{
                  minWidth: day === "Day 1" ? 140 : 90,
                  height: 46,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Text
                  className={`${
                    day === "Day 1" ? styles.buttonPrimaryText : styles.textPrimary
                  } text-center`}
                  style={{ fontSize: 15 }}
                  numberOfLines={1}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        <View className="px-5 mb-4">
          <Text className={`text-2xl font-semibold ${styles.textPrimary}`}>
            At A Glance
          </Text>
        </View>

        {/* Trip Cards Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="max-h-32 mx-2 px-2"
        >
          <View className="flex-row">
            {/* First Card - Main Card */}
            <TouchableOpacity className={`w-72 mr-4 ${styles.cardBg} rounded-lg shadow-lg`}>
              <View className="relative flex items-center justify-center">
                <View className={`absolute top-3 left-3 ${styles.overlayBg} px-3 py-1 rounded-lg shadow-lg`}>
                  <Text className="text-white text-xs">Expenses</Text>
                </View>
                <View className="mx-2 py-10">
                  <Text className={`text-6xl ${styles.textPrimary}`}>$100</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Second Card */}
            <TouchableOpacity className={`w-72 mr-4 ${styles.cardBg} rounded-lg shadow-lg`}>
              <View className="relative flex items-center justify-center">
                <View className={`absolute top-3 left-3 ${styles.overlayBg} px-3 py-1 rounded-lg`}>
                  <Text className="text-white text-xs">Distance</Text>
                </View>
                <View className="mx-2 py-10">
                  <Text className={`text-6xl ${styles.textPrimary}`}>45 KMs</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View className="px-5 my-4">
          <Text className={`text-2xl font-semibold ${styles.textPrimary}`}>
            Places Visited
          </Text>
        </View>

        {/* Places Visited Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="max-h-80 mx-2 px-2"
        >
          <View className="flex-row">
            {/* Taj Mahal Card */}
            <TouchableOpacity
              className="w-72 mr-4"
              onPress={() => router.push("/stack/place")}
            >
              <View className="relative">
                <Image
                  source={{
                    uri: "https://storiesofraku.com/wp-content/uploads/2022/11/Taj-Mahal-scenic-picture-1024x730.jpeg",
                  }}
                  className="w-full h-64 rounded-xl"
                />
                <View className={`absolute top-3 left-3 ${styles.overlayBg} px-3 py-1 rounded-full`}>
                  <Text className="text-white text-xs">Tajganj</Text>
                </View>
                <TouchableOpacity className={`absolute top-3 right-3 p-1.5 ${styles.bgPrimary} rounded-full`}>
                  <Feather name="more-vertical" size={18} color={styles.iconColor} />
                </TouchableOpacity>
                <View className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-white font-bold text-xl">Taj Mahal</Text>
                  <View className="flex-row items-center mt-1">
                    <FontAwesome name="star" size={14} color="white" />
                    <Text className="text-white ml-1">5.0</Text>
                    <Text className="text-white text-xs ml-2">
                      (143 reviews)
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Agra Fort Card */}
            <View className="w-72 mr-4">
              <View className="relative">
                <Image
                  source={{
                    uri: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/75000/75500-Agra-Fort.jpg",
                  }}
                  className="w-full h-64 rounded-xl"
                />
                <View className={`absolute top-3 left-3 ${styles.overlayBg} px-3 py-1 rounded-full`}>
                  <Text className="text-white text-xs">Agra</Text>
                </View>
                <TouchableOpacity className={`absolute top-3 right-3 p-1.5 ${styles.bgPrimary} rounded-full`}>
                  <Feather name="more-vertical" size={18} color={styles.iconColor} />
                </TouchableOpacity>
                <View className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-white font-bold text-xl">
                    Agra Fort
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <FontAwesome name="star" size={14} color="white" />
                    <Text className="text-white ml-1">5.0</Text>
                    <Text className="text-white text-xs ml-2">
                      (143 reviews)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="px-5 my-4">
          <Text className={`text-2xl font-semibold ${styles.textPrimary}`}>
            Food
          </Text>
        </View>

        {/* Food Cards Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="max-h-80 mx-2 px-2 mb-6"
        >
          <View className="flex-row">
            {/* Joney's Place Card */}
            <TouchableOpacity
              className="w-72 mr-4"
              onPress={() => router.push("/stack/food")}
            >
              <View className={`${styles.cardBg} rounded-xl shadow-md overflow-hidden border ${styles.cardBorder}`}>
                <View className={`p-3 border-b ${styles.borderColor}`}>
                  <Text className={`font-semibold ${styles.textPrimary}`}>
                    Joney's Place
                  </Text>
                  <Text className={styles.textSecondary}>India</Text>
                </View>
                <Image
                  source={{
                    uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/96/fa/14/restaurant.jpg?w=600&h=-1&s=1",
                  }}
                  className="w-full h-32"
                />
                <View className="p-3">
                  <Text className={`${styles.textSecondary} text-sm mb-2`}>
                    Discover the traditional food of Agra
                  </Text>
                  <View className="flex-row items-center">
                    <FontAwesome name="star" size={12} color="gold" />
                    <Text className={`${styles.textSecondary} text-xs ml-1`}>
                      5.0 (143)
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Second Food Card */}
            <View className="w-72 mr-4">
              <View className={`${styles.cardBg} rounded-xl shadow-md overflow-hidden border ${styles.cardBorder}`}>
                <View className={`p-3 border-b ${styles.borderColor}`}>
                  <Text className={`font-semibold ${styles.textPrimary}`}>
                    Pinch of Spice
                  </Text>
                  <Text className={styles.textSecondary}>Agra</Text>
                </View>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1627306036351-036986f292a9?q=80&w=2648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  className="w-full h-32"
                />
                <View className="p-3">
                  <Text className={`${styles.textSecondary} text-sm mb-2`}>
                    Modern Indian cuisine with a twist
                  </Text>
                  <View className="flex-row items-center">
                    <FontAwesome name="star" size={12} color="gold" />
                    <Text className={`${styles.textSecondary} text-xs ml-1`}>
                      4.8 (98)
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
