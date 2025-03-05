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
import React, { useState } from "react";

import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

export default function TripScreen() {
  const router = useRouter();
  const styles = useThemedStyles();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('places'); // Default section
  const [showAtAGlance, setShowAtAGlance] = useState(true); // Add this line

  const sections = [
    { id: 'places', label: 'Places & Food', icon: 'location' },
    { id: 'weather', label: 'Weather & Timeline', icon: 'calendar' },
    { id: 'photos', label: 'Trip Photos', icon: 'images' },
    { id: 'companions', label: 'Companions & Notes', icon: 'people' },
  ];

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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Day Selection */}
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

        {/* At A Glance - Collapsible */}
        <View className="px-5 mb-4">
          <TouchableOpacity
            onPress={() => setShowAtAGlance(!showAtAGlance)}
            className="flex-row items-center justify-between"
          >
            <Text className={`text-2xl font-semibold ${styles.textPrimary}`}>
              At A Glance
            </Text>
            <Ionicons
              name={showAtAGlance ? "chevron-up" : "chevron-down"}
              size={24}
              color={styles.iconColor}
            />
          </TouchableOpacity>
        </View>

        {/* Trip Stats Grid - Collapsible */}
        {showAtAGlance && (
          <View className="px-4 mb-6">
            <View className="flex-row mb-2">
              {/* Expenses Card - More Compact */}
              <TouchableOpacity className={`flex-1 mx-1 ${styles.cardBg} rounded-xl overflow-hidden`}>
                <View className="p-3">
                  <View className="flex-row items-center justify-between mb-1">
                    <View className={`${styles.bgSecondary} p-1.5 rounded-lg`}>
                      <Ionicons name="wallet-outline" size={16} color={styles.iconColor} />
                    </View>
                    <View className={`${styles.overlayBg} px-2 py-0.5 rounded-full`}>
                      <Text className="text-white text-xs">Total</Text>
                    </View>
                  </View>
                  <Text className={`text-2xl font-bold ${styles.textPrimary} mt-1`}>₹12,500</Text>
                  <Text className={`${styles.textSecondary} text-xs mt-0.5`}>Expenses</Text>
                </View>
              </TouchableOpacity>

              {/* Distance Card - More Compact */}
              <TouchableOpacity className={`flex-1 mx-1 ${styles.cardBg} rounded-xl overflow-hidden`}>
                <View className="p-3">
                  <View className="flex-row items-center justify-between mb-1">
                    <View className={`${styles.bgSecondary} p-1.5 rounded-lg`}>
                      <Ionicons name="map-outline" size={16} color={styles.iconColor} />
                    </View>
                    <View className={`${styles.overlayBg} px-2 py-0.5 rounded-full`}>
                      <Text className="text-white text-xs">Total</Text>
                    </View>
                  </View>
                  <Text className={`text-2xl font-bold ${styles.textPrimary} mt-1`}>45</Text>
                  <Text className={`${styles.textSecondary} text-xs mt-0.5`}>Kilometers</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex-row">
              {/* Duration Card - More Compact */}
              <TouchableOpacity className={`flex-1 mx-1 ${styles.cardBg} rounded-xl overflow-hidden`}>
                <View className="p-3">
                  <View className="flex-row items-center justify-between mb-1">
                    <View className={`${styles.bgSecondary} p-1.5 rounded-lg`}>
                      <Ionicons name="time-outline" size={16} color={styles.iconColor} />
                    </View>
                    <View className={`${styles.overlayBg} px-2 py-0.5 rounded-full`}>
                      <Text className="text-white text-xs">Duration</Text>
                    </View>
                  </View>
                  <Text className={`text-2xl font-bold ${styles.textPrimary} mt-1`}>4</Text>
                  <Text className={`${styles.textSecondary} text-xs mt-0.5`}>Days</Text>
                </View>
              </TouchableOpacity>

              {/* Places Card - More Compact */}
              <TouchableOpacity className={`flex-1 mx-1 ${styles.cardBg} rounded-xl overflow-hidden`}>
                <View className="p-3">
                  <View className="flex-row items-center justify-between mb-1">
                    <View className={`${styles.bgSecondary} p-1.5 rounded-lg`}>
                      <Ionicons name="location-outline" size={16} color={styles.iconColor} />
                    </View>
                    <View className={`${styles.overlayBg} px-2 py-0.5 rounded-full`}>
                      <Text className="text-white text-xs">Visited</Text>
                    </View>
                  </View>
                  <Text className={`text-2xl font-bold ${styles.textPrimary} mt-1`}>6</Text>
                  <Text className={`${styles.textSecondary} text-xs mt-0.5`}>Days</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Section Navigation */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 mb-6"
        >
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => setActiveSection(section.id)}
              className={`flex-row items-center px-4 py-3 mr-3 rounded-full ${
                activeSection === section.id
                  ? styles.buttonPrimary
                  : `${styles.bgPrimary} border ${styles.borderColor}`
              }`}
            >
              <Ionicons
                name={section.icon as any}
                size={18}
                color={activeSection === section.id ? "white" : styles.iconColor}
                style={{ marginRight: 6 }}
              />
              <Text
                className={`${
                  activeSection === section.id ? styles.buttonPrimaryText : styles.textPrimary
                }`}
              >
                {section.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Conditional Content Based on Active Section */}
        {activeSection === 'places' && (
          <>
            {/* Places Visited Section */}
            <View className="px-5 mb-4">
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

            {/* Food Section */}
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
          </>
        )}

        {activeSection === 'weather' && (
          <>
            {/* Weather Section - More Compact */}
            <View className="px-5 my-4">
              <Text className={`text-2xl font-semibold ${styles.textPrimary} mb-3`}>Weather Forecast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                  { day: "Today", temp: "32°", icon: "sunny", condition: "Clear" },
                  { day: "Tomorrow", temp: "28°", icon: "rainy", condition: "Rain" },
                  { day: "Wed", temp: "30°", icon: "partly-sunny", condition: "Partly Cloudy" },
                  { day: "Thu", temp: "31°", icon: "sunny", condition: "Clear" },
                ].map((weather, index) => (
                  <View
                    key={index}
                    className={`${styles.cardBg} p-3 rounded-xl mr-2 w-20 items-center`}
                  >
                    <Text className={`${styles.textSecondary} text-xs`}>{weather.day}</Text>
                    <Ionicons name={weather.icon as any} size={24} color={styles.iconColor} style={{ marginVertical: 6 }} />
                    <Text className={`text-lg font-bold ${styles.textPrimary}`}>{weather.temp}</Text>
                    <Text className={`text-[10px] ${styles.textSecondary}`}>{weather.condition}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Trip Timeline */}
            <View className="px-5 my-4">
              <Text className={`text-2xl font-semibold ${styles.textPrimary} mb-4`}>Trip Timeline</Text>
              <View className="space-y-4">
                {[
                  { time: "9:00 AM", title: "Taj Mahal Visit", status: "Completed", icon: "location" },
                  { time: "12:30 PM", title: "Lunch at Joney's", status: "Upcoming", icon: "restaurant" },
                  { time: "2:00 PM", title: "Agra Fort Tour", status: "Upcoming", icon: "business" },
                ].map((item, index) => (
                  <View key={index} className={`flex-row ${styles.cardBg} p-4 rounded-2xl`}>
                    <View className={`${styles.bgSecondary} h-12 w-12 rounded-xl items-center justify-center`}>
                      <Ionicons name={item.icon as any} size={24} color={styles.iconColor} />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text className={`font-medium ${styles.textPrimary}`}>{item.title}</Text>
                      <Text className={styles.textSecondary}>{item.time}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${item.status === 'Completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      <Text className={item.status === 'Completed' ? 'text-green-700' : 'text-yellow-700'}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {activeSection === 'photos' && (
          <View className="px-5 my-4">
            <Text className={`text-2xl font-semibold ${styles.textPrimary} mb-4`}>Trip Photos</Text>
            <View className="flex-row flex-wrap justify-between">
              {[1, 2, 3, 4, 5, 6].map((photo, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[48%] aspect-square mb-3 rounded-2xl overflow-hidden"
                >
                  <Image
                    source={{ uri: `https://picsum.photos/500?random=${photo}` }}
                    className="w-full h-full"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeSection === 'companions' && (
          <>
            {/* Travel Companions */}
            <View className="px-5 my-4">
              <Text className={`text-2xl font-semibold ${styles.textPrimary} mb-4`}>Travel Companions</Text>
              <View className={`${styles.cardBg} p-4 rounded-2xl`}>
                <View className="flex-row items-center mb-4">
                  {[1, 2, 3].map((user, index) => (
                    <Image
                      key={index}
                      source={{ uri: `https://randomuser.me/api/portraits/${index % 2 ? 'women' : 'men'}/${user}.jpg` }}
                      className="w-12 h-12 rounded-full border-2 border-white"
                      style={{ marginLeft: index === 0 ? 0 : -8 }}
                    />
                  ))}
                  <TouchableOpacity className={`w-12 h-12 rounded-full ${styles.bgSecondary} items-center justify-center ml-2`}>
                    <Ionicons name="add" size={24} color={styles.iconColor} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className={`${styles.buttonPrimary} py-2 rounded-xl`}>
                  <Text className={`text-center ${styles.buttonPrimaryText}`}>Share Trip</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Trip Notes */}
            <View className="px-5 my-4">
              <Text className={`text-2xl font-semibold ${styles.textPrimary} mb-4`}>Trip Notes</Text>
              <View className={`${styles.cardBg} p-4 rounded-2xl`}>
                {[
                  { text: "Book evening tour tickets", completed: true },
                  { text: "Exchange currency", completed: true },
                  { text: "Pack camera gear", completed: false },
                  { text: "Confirm hotel booking", completed: false },
                ].map((note, index) => (
                  <TouchableOpacity
                    key={index}
                    className="flex-row items-center py-3 border-b border-gray-200"
                  >
                    <View className={`w-6 h-6 rounded-full border-2 ${note.completed ? styles.buttonPrimary : 'border-gray-300'} items-center justify-center`}>
                      {note.completed && <Ionicons name="checkmark" size={16} color="white" />}
                    </View>
                    <Text className={`ml-3 ${note.completed ? 'line-through ' + styles.textSecondary : styles.textPrimary}`}>
                      {note.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Transportation */}
            <View className="px-5 my-4 mb-6">
              <Text className={`text-2xl font-semibold ${styles.textPrimary} mb-4`}>Transportation</Text>
              <TouchableOpacity className={`${styles.cardBg} p-4 rounded-2xl flex-row items-center`}>
                <View className={`${styles.bgSecondary} p-3 rounded-xl`}>
                  <Ionicons name="car" size={24} color={styles.iconColor} />
                </View>
                <View className="flex-1 ml-4">
                  <Text className={`font-medium ${styles.textPrimary}`}>Rental Car</Text>
                  <Text className={styles.textSecondary}>Toyota Camry • DL 01 AB 1234</Text>
                </View>
                <View className={`${styles.overlayBg} px-3 py-1 rounded-full`}>
                  <Text className="text-white text-xs">Active</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
