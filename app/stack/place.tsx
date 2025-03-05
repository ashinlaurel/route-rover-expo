import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 400;

export default function PlaceScreen() {
  const router = useRouter();
  const styles = useThemedStyles();
  const { isDarkMode } = useTheme();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Mock data for Taj Mahal
  const placeData = {
    name: "Taj Mahal",
    country: "India",
    rating: "5.0",
    reviewCount: "143k",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna. Built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, this UNESCO World Heritage site is one of the New Seven Wonders of the World. The monument's stunning symmetry and architectural grandeur make it one of humanity's most remarkable achievements in architecture...",
    timings: "6:00 AM - 7:00 PM (Closed on Fridays)",
    entryFee: "₹1,100 for foreigners, ₹50 for Indians",
    bestTimeToVisit: "October to March",
    facilities: [
      { id: 1, name: "Parking", icon: "local-parking" },
      { id: 2, name: "Restrooms", icon: "wc" },
      { id: 3, name: "Wheelchair Access", icon: "accessible" },
      { id: 4, name: "Guide Service", icon: "record-voice-over" },
      { id: 5, name: "Photography", icon: "camera-alt" }
    ],
    highlights: [
      "UNESCO World Heritage Site",
      "One of the New Seven Wonders",
      "Perfect Symmetrical Architecture",
      "22 Small Domes",
      "Intricate Marble Work"
    ],
    upcomingTours: [
      {
        id: 1,
        name: "Taj Mahal Sunrise Tour",
        duration: "6 hours",
        price: "from $45/person",
        rating: "4.8",
        reviewCount: "2.4k",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2671&auto=format&fit=crop"
      },
      {
        id: 2,
        name: "Agra Heritage Walk",
        duration: "2 days",
        rating: "4.7",
        price: "from $89/person",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2676&auto=format&fit=crop"
      },
      {
        id: 3,
        name: "Moonlight Garden Tour",
        duration: "4 hours",
        rating: "4.9",
        price: "from $65/person",
        image: "https://images.unsplash.com/photo-1590687664033-89a8f1fc39f5?q=80&w=2670&auto=format&fit=crop"
      }
    ],
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2671&auto=format&fit=crop"
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
          source={{ uri: placeData.image }}
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
                {placeData.name}
              </Text>
              <View className={`flex-row items-center px-3 py-1 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                <Ionicons name="star" size={16} color={isDarkMode ? "#fff" : "#000"} />
                <Text className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{placeData.rating}</Text>
              </View>
            </View>
            <Text className={`text-sm mt-2 tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {placeData.reviewCount} reviews • {placeData.country}
            </Text>
          </View>

          {/* Description */}
          <View className="px-8 mb-8">
            <Text className={`text-[17px] leading-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {showFullDescription ? placeData.description : `${placeData.description.slice(0, 150)}...`}
            </Text>
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
              className="mt-3"
            >
              <Text className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {showFullDescription ? 'Show less' : 'Read more'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Available Tours */}
          <View className="px-8">
            <View className="flex-row justify-between items-center mb-6">
              <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available tours</Text>
              <TouchableOpacity>
                <Text className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="h-[340px] -mx-8"
              contentContainerClassName="px-8"
            >
              {placeData.upcomingTours.map((tour, index) => (
                <TouchableOpacity
                  key={tour.id}
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-lg w-[280px] h-[320px] overflow-hidden ${
                    index !== placeData.upcomingTours.length - 1 ? 'mr-6' : ''
                  }`}
                >
                  <Image
                    source={{ uri: tour.image }}
                    className="w-full h-[180px]"
                    resizeMode="cover"
                  />
                  <View className="p-4">
                    <Text className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{tour.name}</Text>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Text className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tour.duration}</Text>
                        <View className={`w-1 h-1 rounded-full mx-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} />
                        <Text className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tour.price}</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center mt-3">
                      <View className="flex-row items-center flex-1">
                        <FontAwesome name="star" size={14} color={isDarkMode ? "#fff" : "#000"} />
                        <Text className={`ml-1.5 font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{tour.rating}</Text>
                        <Text className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({tour.reviewCount})</Text>
                      </View>
                      <TouchableOpacity
                        className={`w-10 h-10 rounded-full items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}
                      >
                        <Ionicons name="arrow-forward" size={20} color={isDarkMode ? "#fff" : "#000"} />
                      </TouchableOpacity>
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
              {placeData.facilities.map((feature) => (
                <View
                  key={feature.id}
                  className={`px-4 py-3 rounded-2xl flex-row items-center ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}
                >
                  <Ionicons
                    name={feature.icon === "local-parking" ? "car" :
                      feature.icon === "wc" ? "water" :
                      feature.icon === "accessible" ? "accessibility" :
                      feature.icon === "record-voice-over" ? "person" :
                      "camera"}
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
            <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Visit Information</Text>
            <View>
              {/* Timing Card */}
              <View className={`p-4 rounded-3xl mb-4 ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                <View className="flex-row items-center mb-1">
                  <Ionicons name="time-outline" size={20} color={isDarkMode ? "#fff" : "#000"} />
                  <Text className={`text-base font-semibold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Opening Hours</Text>
                </View>
                <Text className={`ml-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{placeData.timings}</Text>
              </View>

              {/* Entry Fee Card */}
              <View className={`p-4 rounded-3xl mb-4 ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                <View className="flex-row items-center mb-1">
                  <Ionicons name="ticket-outline" size={20} color={isDarkMode ? "#fff" : "#000"} />
                  <Text className={`text-base font-semibold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Entry Fee</Text>
                </View>
                <Text className={`ml-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{placeData.entryFee}</Text>
              </View>

              {/* Best Time Card */}
              <View className={`p-4 rounded-3xl ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                <View className="flex-row items-center mb-1">
                  <Ionicons name="calendar-outline" size={20} color={isDarkMode ? "#fff" : "#000"} />
                  <Text className={`text-base font-semibold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Best Time to Visit</Text>
                </View>
                <Text className={`ml-7 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{placeData.bestTimeToVisit}</Text>
              </View>
            </View>
          </View>

          {/* Highlights */}
          <View className="px-8 mt-12">
            <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Highlights</Text>
            <View className={`p-5 rounded-3xl ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
              {placeData.highlights.map((highlight, index) => (
                <View key={index} className={`flex-row items-center ${index !== placeData.highlights.length - 1 ? 'mb-3' : ''}`}>
                  <View className={`w-1.5 h-1.5 rounded-full mr-3 ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
                  <Text className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{highlight}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-24" />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
