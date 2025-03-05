import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";

import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

export default function MainFeed() {
  const router = useRouter();
  const styles = useThemedStyles();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Netherlands");
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 50000]);
  const [days, setDays] = useState<[number, number]>([1, 30]);
  const [selectedTripTypes, setSelectedTripTypes] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const savedLocations = [
    {
      id: '1',
      name: 'Current Location',
      address: 'Netherlands',
      icon: 'navigate' as const
    },
    {
      id: '2',
      name: 'Home',
      address: 'Amsterdam, Netherlands',
      icon: 'home' as const
    },
    {
      id: '3',
      name: 'Work',
      address: 'Rotterdam, Netherlands',
      icon: 'briefcase' as const
    },
    {
      id: '4',
      name: 'Favorite Spot',
      address: 'The Hague, Netherlands',
      icon: 'heart' as const
    }
  ];

  const tripTypes = ["Solo", "Family", "Group", "Couple"] as const;
  const activities = ["Adventure", "Cultural", "Beach", "Mountain", "City"] as const;

  // Sample suggestions - you can replace this with your actual data
  const suggestions = [
    {
      id: '1',
      name: 'Agra',
      country: 'India',
      type: 'Popular Destination',
      icon: 'location' as const
    },
    {
      id: '2',
      name: 'Amsterdam',
      country: 'Netherlands',
      type: 'Trending',
      icon: 'trending-up' as const
    },
    {
      id: '3',
      name: 'Bali',
      country: 'Indonesia',
      type: 'Beach Destination',
      icon: 'sunny' as const
    },
    {
      id: '4',
      name: 'Paris',
      country: 'France',
      type: 'Most Visited',
      icon: 'star' as const
    }
  ];

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTripType = (type: string) => {
    if (selectedTripTypes.includes(type)) {
      setSelectedTripTypes(selectedTripTypes.filter(item => item !== type));
    } else {
      setSelectedTripTypes([...selectedTripTypes, type]);
    }
  };

  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(item => item !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  return (
    <KeyboardAvoidingView className={`flex-1 ${styles.bgPrimary}`}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#111827" : "#FFFFFF"}
      />
      <TouchableWithoutFeedback onPress={() => setIsSearchFocused(false)}>
        <View className="flex-1">
          {/* Header */}
          <View className="p-5">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => setShowLocationModal(true)}
                className="flex-1"
              >
                <Text className={styles.textSecondary}>Current Location</Text>
                <View className="flex-row items-center">
                  <Text className={`text-2xl font-medium ${styles.textPrimary}`}>
                    {selectedLocation}
                  </Text>
                  <Feather name="chevron-down" size={24} color={styles.iconColor} className="ml-2" />
                </View>
              </TouchableOpacity>
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
          </View>

          {/* Location Selection Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showLocationModal}
            onRequestClose={() => setShowLocationModal(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowLocationModal(false)}>
              <View className={`flex-1 ${styles.overlayBg}`}>
                <View className="absolute top-[90px] left-5 right-5">
                  <View className={`${styles.cardBg} rounded-3xl shadow-xl`}>
                    <View className="p-6">
                      <Text className={`text-xl font-semibold ${styles.textPrimary} mb-6`}>
                        Select Location
                      </Text>

                      {/* Search Bar */}
                      <View className={`flex-row items-center ${styles.inputBg} rounded-2xl px-4 py-3 mb-6`}>
                        <Ionicons name="search-outline" size={20} color={styles.iconColorMuted} />
                        <TextInput
                          placeholder="Search location..."
                          className={`flex-1 ml-2 ${styles.inputText}`}
                          placeholderTextColor={styles.iconColorMuted}
                        />
                      </View>

                      {/* Saved Locations */}
                      <View className="space-y-3">
                        {savedLocations.map((location) => (
                          <TouchableOpacity
                            key={location.id}
                            onPress={() => {
                              setSelectedLocation(location.address);
                              setShowLocationModal(false);
                            }}
                            className={`flex-row items-center ${styles.bgSecondary} p-3.5 rounded-2xl`}
                          >
                            <View className={`${styles.bgPrimary} p-2 rounded-xl`}>
                              <Ionicons name={`${location.icon}-outline`} size={20} color={styles.iconColor} />
                            </View>
                            <View className="ml-4 flex-1">
                              <Text className={`${styles.textPrimary} font-semibold`}>
                                {location.name}
                              </Text>
                              <Text className={styles.textSecondary}>
                                {location.address}
                              </Text>
                            </View>
                            {selectedLocation === location.address && (
                              <View className={`${styles.bgPrimary} p-1 rounded-full`}>
                                <Ionicons name="checkmark" size={16} color={styles.iconColor} />
                              </View>
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>

                      {/* Add New Location Button */}
                      <TouchableOpacity
                        className={`mt-4 flex-row items-center justify-center ${styles.bgSecondary} p-3.5 rounded-2xl`}
                      >
                        <Ionicons name="add-circle-outline" size={24} color={styles.iconColor} />
                        <Text className={`ml-2 ${styles.textPrimary} font-semibold`}>
                          Add New Location
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Search Bar with Settings */}
          <View className="px-5 mb-6 flex-row items-center space-x-3">
            <View className="flex-1">
              <View className={`flex-row items-center ${styles.inputBg} rounded-full px-4 py-2`}>
                <Feather name="search" size={20} color={styles.iconColorMuted} />
                <TextInput
                  placeholder="Search destination..."
                  className={`flex-1 ml-3 ${styles.inputText}`}
                  placeholderTextColor={styles.iconColorMuted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Feather name="x" size={20} color={styles.iconColorMuted} />
                  </TouchableOpacity>
                )}
              </View>

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && (
                <View
                  className={`absolute top-14 left-0 right-0 ${styles.cardBg} rounded-3xl shadow-xl`}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 5,
                    zIndex: 50
                  }}
                >
                  <View className="p-4">
                    {searchQuery.length === 0 ? (
                      <View>
                        <Text className={`${styles.textPrimary} font-semibold mb-3`}>Popular Searches</Text>
                        <View className="flex-row flex-wrap gap-2">
                          {["Beach Destinations", "Mountain Trips", "City Tours", "Adventure"].map((item) => (
                            <TouchableOpacity
                              key={item}
                              className={`${styles.bgSecondary} px-4 py-2 rounded-full`}
                              onPress={() => setSearchQuery(item)}
                            >
                              <Text className={styles.textPrimary}>{item}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    ) : (
                      <View className="space-y-2">
                        {filteredSuggestions.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            className={`flex-row items-center p-3 rounded-2xl hover:${styles.bgSecondary}`}
                            onPress={() => {
                              setSearchQuery(item.name);
                              setIsSearchFocused(false);
                            }}
                          >
                            <View className={`${styles.bgSecondary} p-2 rounded-xl`}>
                              <Ionicons name={item.icon} size={20} color={styles.iconColor} />
                            </View>
                            <View className="ml-3 flex-1">
                              <Text className={`${styles.textPrimary} font-medium`}>{item.name}</Text>
                              <Text className={styles.textSecondary}>{item.country}</Text>
                            </View>
                            <View className={`${styles.bgSecondary} px-2 py-1 rounded-full`}>
                              <Text className={styles.textSecondary}>{item.type}</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity
              className={`${styles.bgSecondary} p-2.5 rounded-full`}
              onPress={() => setShowFilterModal(true)}
            >
              <Feather name="sliders" size={20} color={styles.iconColor} />
            </TouchableOpacity>
          </View>

          <ScrollView className="">
            {/* Trip Selection Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-5 mb-6 max-h-14"
            >
              {["Asia", "Europe", "South America", "North America"].map(
                (region, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`px-4 py-3 mr-3 rounded-full ${
                      region === "South America"
                        ? styles.buttonPrimary
                        : `${styles.bgPrimary} border ${styles.borderColor}`
                    }`}
                    style={{
                      minWidth: region === "South America" ? 140 : 90,
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
                        region === "South America" ? styles.buttonPrimaryText : styles.textPrimary
                      } text-center`}
                      style={{ fontSize: 15 }}
                      numberOfLines={1}
                    >
                      {region}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>

            <View className="px-5 mb-4">
              <Text className={`text-2xl font-semibold ${styles.textPrimary}`}>
                Featured Trips
              </Text>
            </View>

            {/* Trip Cards Carousel */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="max-h-80 mx-2 px-2"
            >
              <View className="flex-row">
                {/* First Card - Main Card */}
                <TouchableOpacity
                  className="w-72 mr-4"
                  onPress={() => router.push("/stack/trips")}
                >
                  <View className="relative">
                    <Image
                      source={{
                        uri: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      }}
                      className="w-full h-64 rounded-xl"
                    />
                    <View className={`absolute top-3 left-3 ${styles.overlayBg} px-3 py-1 rounded-full`}>
                      <Text className="text-white text-xs">India</Text>
                    </View>
                    <TouchableOpacity className={`absolute top-3 right-3 p-1.5 ${styles.bgPrimary} rounded-full`}>
                      <Feather name="more-vertical" size={18} color={styles.iconColor} />
                    </TouchableOpacity>
                    <View className="absolute bottom-0 left-0 right-0 p-4">
                      <Text className="text-white font-bold text-xl">Agra</Text>
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

                <View className="w-72 mr-4">
                  <View className="relative">
                    <Image
                      source={{
                        uri: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                      }}
                      className="w-full h-64 rounded-xl"
                    />
                    <View className={`absolute top-3 left-3 ${styles.overlayBg} px-3 py-1 rounded-full`}>
                      <Text className="text-white text-xs">Brazil</Text>
                    </View>
                    <TouchableOpacity className={`absolute top-3 right-3 p-1.5 ${styles.bgPrimary} rounded-full`}>
                      <Feather name="more-vertical" size={18} color={styles.iconColor} />
                    </TouchableOpacity>
                    <View className="absolute bottom-0 left-0 right-0 p-4">
                      <Text className="text-white font-bold text-xl">
                        Rio de Janeiro
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
                Quick Trips
              </Text>
            </View>

            {/* Trip Cards Carousel */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="max-h-80 mx-2 px-2"
            >
              <View className="flex-row">
                {/* First Card - Main Card */}

                {/* Second Card - Detail Card */}
                <View className="w-72 mr-4">
                  <View className={`${styles.cardBg} rounded-xl shadow-md overflow-hidden border ${styles.cardBorder}`}>
                    <View className={`p-3 border-b ${styles.borderColor}`}>
                      <Text className={`font-semibold ${styles.textPrimary}`}>
                        Goa
                      </Text>
                      <Text className={styles.textSecondary}>India</Text>
                    </View>
                    <Image
                      source={{
                        uri: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      }}
                      className="w-full h-32"
                    />
                    <View className="p-3">
                      <Text className={`${styles.textSecondary} text-sm mb-2`}>
                        Discover the vibrant culture and stunning beaches of Rio de
                        Janeiro.
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                          <FontAwesome name="star" size={12} color="gold" />
                          <Text className={`${styles.textSecondary} text-xs ml-1`}>
                            5.0 (143)
                          </Text>
                        </View>
                        <TouchableOpacity className={`${styles.buttonPrimary} px-2.5 py-1 rounded-full`}>
                          <Text className={styles.buttonPrimaryText}>Book now</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="w-72 mr-4">
                  <View className={`${styles.cardBg} rounded-xl shadow-md overflow-hidden border ${styles.cardBorder}`}>
                    <View className={`p-3 border-b ${styles.borderColor}`}>
                      <Text className={`font-semibold ${styles.textPrimary}`}>
                        Church Street
                      </Text>
                      <Text className={styles.textSecondary}>Bangalore</Text>
                    </View>
                    <Image
                      source={{
                        uri: "https://images.unsplash.com/photo-1627306036351-036986f292a9?q=80&w=2648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      }}
                      className="w-full h-32"
                    />
                    <View className="p-3">
                      <Text className={`${styles.textSecondary} text-sm mb-2`}>
                        Discover the vibrant culture and stunning beaches of Rio de
                        Janeiro.
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                          <FontAwesome name="star" size={12} color="gold" />
                          <Text className={`${styles.textSecondary} text-xs ml-1`}>
                            5.0 (143)
                          </Text>
                        </View>
                        <TouchableOpacity className={`${styles.buttonPrimary} px-2.5 py-1 rounded-full`}>
                          <Text className={styles.buttonPrimaryText}>Book now</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </ScrollView>

          {/* Filter Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showFilterModal}
            onRequestClose={() => setShowFilterModal(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
              <View className={`flex-1 ${styles.overlayBg} justify-end`}>
                <TouchableWithoutFeedback>
                  <View className={`${styles.cardBg} rounded-t-3xl`}>
                    <View className="p-6">
                      <View className="items-center mb-6">
                        <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
                        <Text className={`text-xl font-semibold ${styles.textPrimary}`}>
                          Filter Trips
                        </Text>
                      </View>

                      {/* Price Range */}
                      <View className="mb-6">
                        <Text className={`${styles.textPrimary} font-semibold text-lg mb-4`}>
                          Price Range
                        </Text>
                        <View className="flex-row justify-between mb-2">
                          <Text className={styles.textSecondary}>₹{priceRange[0]}</Text>
                          <Text className={styles.textSecondary}>₹{priceRange[1]}</Text>
                        </View>
                        <Slider
                          style={{width: '100%', height: 40}}
                          minimumValue={1000}
                          maximumValue={50000}
                          value={priceRange[1]}
                          minimumTrackTintColor={styles.iconColor}
                          maximumTrackTintColor="#DDDDDD"
                          onValueChange={value => setPriceRange([priceRange[0], Math.round(value)])}
                        />
                      </View>

                      {/* Days Range */}
                      <View className="mb-6">
                        <Text className={`${styles.textPrimary} font-semibold text-lg mb-4`}>
                          Duration (Days)
                        </Text>
                        <View className="flex-row justify-between mb-2">
                          <Text className={styles.textSecondary}>{days[0]} days</Text>
                          <Text className={styles.textSecondary}>{days[1]} days</Text>
                        </View>
                        <Slider
                          style={{width: '100%', height: 40}}
                          minimumValue={1}
                          maximumValue={30}
                          value={days[1]}
                          minimumTrackTintColor={styles.iconColor}
                          maximumTrackTintColor="#DDDDDD"
                          onValueChange={value => setDays([days[0], Math.round(value)])}
                        />
                      </View>

                      {/* Trip Types */}
                      <View className="mb-6">
                        <Text className={`${styles.textPrimary} font-semibold text-lg mb-4`}>
                          Trip Type
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                          {tripTypes.map((type) => (
                            <TouchableOpacity
                              key={type}
                              onPress={() => toggleTripType(type)}
                              className={`px-4 py-2 rounded-full border ${
                                selectedTripTypes.includes(type)
                                  ? styles.buttonPrimary
                                  : `${styles.bgPrimary} ${styles.borderColor}`
                              }`}
                            >
                              <Text
                                className={`font-medium ${
                                  selectedTripTypes.includes(type)
                                    ? styles.buttonPrimaryText
                                    : styles.textPrimary
                                }`}
                              >
                                {type}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      {/* Activities */}
                      <View className="mb-6">
                        <Text className={`${styles.textPrimary} font-semibold text-lg mb-4`}>
                          Activities
                        </Text>
                        <View className="flex-row flex-wrap gap-2">
                          {activities.map((activity) => (
                            <TouchableOpacity
                              key={activity}
                              onPress={() => toggleActivity(activity)}
                              className={`px-4 py-2 rounded-full border ${
                                selectedActivities.includes(activity)
                                  ? styles.buttonPrimary
                                  : `${styles.bgPrimary} ${styles.borderColor}`
                              }`}
                            >
                              <Text
                                className={`font-medium ${
                                  selectedActivities.includes(activity)
                                    ? styles.buttonPrimaryText
                                    : styles.textPrimary
                                }`}
                              >
                                {activity}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      {/* Action Buttons */}
                      <View className="flex-row space-x-4">
                        <TouchableOpacity
                          onPress={() => {
                            setPriceRange([1000, 50000]);
                            setDays([1, 30]);
                            setSelectedTripTypes([]);
                            setSelectedActivities([]);
                          }}
                          className={`flex-1 py-4 rounded-2xl ${styles.bgSecondary}`}
                        >
                          <Text className={`${styles.textPrimary} text-center font-semibold`}>
                            Reset
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setShowFilterModal(false)}
                          className={`flex-1 py-4 rounded-2xl ${styles.buttonPrimary}`}
                        >
                          <Text className={`${styles.buttonPrimaryText} text-center font-semibold`}>
                            Apply
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
