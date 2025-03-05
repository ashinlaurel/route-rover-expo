import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

export default function FoodScreen() {
  const router = useRouter();
  const styles = useThemedStyles();
  const { isDarkMode } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Mock data for Joney's Place
  const foodData = {
    name: "Joney's Place",
    location: "Agra, India",
    rating: "4.8",
    reviewCount: "2.4k",
    description: "A beloved local eatery known for its authentic North Indian cuisine, Joney's Place has been serving delicious food for over 30 years. Famous for its butter chicken and fresh naan bread, this restaurant offers a perfect blend of traditional flavors and modern ambiance.",
    priceRange: "₹500-1000 for two",
    cuisine: "North Indian",
    timings: "11:00 AM - 11:00 PM",
    features: [
      { id: 1, name: "Outdoor Seating", icon: "restaurant" },
      { id: 2, name: "Takeaway", icon: "bag-handle" },
      { id: 3, name: "Card Accepted", icon: "card" },
      { id: 4, name: "Free Wifi", icon: "wifi" },
      { id: 5, name: "Air Conditioned", icon: "snow" }
    ],
    popularDishes: [
      {
        id: 1,
        name: "Butter Chicken",
        price: "₹350",
        rating: "4.9",
        reviewCount: "1.2k",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670&auto=format&fit=crop"
      },
      {
        id: 2,
        name: "Dal Makhani",
        price: "₹250",
        rating: "4.7",
        reviewCount: "980",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2676&auto=format&fit=crop"
      },
      {
        id: 3,
        name: "Garlic Naan",
        price: "₹60",
        rating: "4.8",
        reviewCount: "1.5k",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670&auto=format&fit=crop"
      }
    ],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop"
  };

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT / 2],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView className={`flex-1 ${styles.bgPrimary}`} edges={['top']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Hero Image - Fixed Position */}
      <Animated.View
        className="absolute top-0 left-0 right-0"
        style={{
          height: HEADER_HEIGHT,
          transform: [{ translateY: headerTranslateY }],
        }}
      >
        <Animated.Image
          source={{ uri: foodData.image }}
          className="w-full h-full"
          style={{ opacity: imageOpacity }}
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/20" />
      </Animated.View>

      {/* Header Actions - Fixed Position */}
      <View className="absolute left-0 right-0 z-10 p-4 flex-row justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-sm"
        >
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        className="flex-1"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Spacer for header */}
        <View style={{ height: HEADER_HEIGHT * 0.7 }} />

        {/* Content */}
        <View className={`${styles.bgPrimary} min-h-screen rounded-t-[40px] -mt-16 shadow-lg`}>
          {/* Title Section */}
          <View className="p-8 mt-4">
            <View className="flex-row justify-between items-start">
              <Text className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {foodData.name}
              </Text>
              <View className={`flex-row items-center px-3 py-1 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                <Ionicons name="star" size={16} color={isDarkMode ? "#fff" : "#000"} />
                <Text className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{foodData.rating}</Text>
              </View>
            </View>
            <Text className={`text-sm mt-2 tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {foodData.reviewCount} reviews • {foodData.location}
            </Text>
          </View>

          {/* Description */}
          <View className="px-8 mb-8">
            <Text className={`text-[17px] leading-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {foodData.description}
            </Text>
          </View>

          {/* Popular Dishes */}
          <View className="px-8">
            <View className="flex-row justify-between items-center mb-6">
              <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Popular dishes</Text>
              <TouchableOpacity>
                <Text className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>See menu</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="h-[280px] -mx-8"
              contentContainerClassName="px-8"
            >
              {foodData.popularDishes.map((dish, index) => (
                <TouchableOpacity
                  key={dish.id}
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-lg w-[240px] h-[260px] overflow-hidden ${
                    index !== foodData.popularDishes.length - 1 ? 'mr-6' : ''
                  }`}
                >
                  <Image
                    source={{ uri: dish.image }}
                    className="w-full h-[140px]"
                    resizeMode="cover"
                  />
                  <View className="p-4">
                    <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{dish.name}</Text>
                    <Text className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{dish.price}</Text>
                    <View className="flex-row items-center mt-2">
                      <FontAwesome name="star" size={14} color={isDarkMode ? "#fff" : "#000"} />
                      <Text className={`ml-1.5 font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{dish.rating}</Text>
                      <Text className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({dish.reviewCount})</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Features Section */}
          <View className="px-8 mt-12">
            <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Features</Text>
            <View className="flex-row flex-wrap gap-4">
              {foodData.features.map((feature) => (
                <View
                  key={feature.id}
                  className={`px-4 py-3 rounded-2xl flex-row items-center ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}
                >
                  <Ionicons
                    name={feature.icon}
                    size={18}
                    color={isDarkMode ? "#fff" : "#000"}
                  />
                  <Text className={`ml-2 font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{feature.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Info Cards */}
          <View className="px-8 mt-12">
            <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Restaurant Information</Text>
            <View>
              {/* Timing Card */}
              <View className={`p-4 rounded-3xl mb-4 ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                <View className="flex-row items-center mb-1">
                  <Ionicons name="time-outline" size={20} color={isDarkMode ? "#fff" : "#000"} />
                  <Text className={`text-base font-semibold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Opening Hours</Text>
                </View>
                <Text className={`ml-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{foodData.timings}</Text>
              </View>

              {/* Cuisine Card */}
              <View className={`p-4 rounded-3xl mb-4 ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                <View className="flex-row items-center mb-1">
                  <Ionicons name="restaurant-outline" size={20} color={isDarkMode ? "#fff" : "#000"} />
                  <Text className={`text-base font-semibold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Cuisine</Text>
                </View>
                <Text className={`ml-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{foodData.cuisine}</Text>
              </View>

              {/* Price Range Card */}
              <View className={`p-4 rounded-3xl ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                <View className="flex-row items-center mb-1">
                  <Ionicons name="wallet-outline" size={20} color={isDarkMode ? "#fff" : "#000"} />
                  <Text className={`text-base font-semibold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Price Range</Text>
                </View>
                <Text className={`ml-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{foodData.priceRange}</Text>
              </View>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-24" />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
