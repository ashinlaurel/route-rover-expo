import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { useRouter } from "expo-router";

export default function MainFeed() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      {/* Header */}
      <View className="p-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-gray-500">Current Location</Text>
            <View className="flex-row items-center">
              <Text className="text-2xl font-medium text-gray-800">
                Netherlands
              </Text>
              <TouchableOpacity className="ml-2">
                <Feather name="chevron-down" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar with Settings */}
      <View className="px-5 mb-6 flex-row items-center space-x-3">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search destination..."
            className="flex-1 ml-3 text-gray-600"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity
          className="bg-gray-100 p-2.5 rounded-full"
          onPress={() => {/* Add settings action */}}
        >
          <Feather name="sliders" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="">
        {/* Trip Selection Header */}
        {/* <View className="px-6 mb-8">
          <Text className="text-4xl font-semibold text-gray-800 mb-2">
            Hi, Amanda 👋
          </Text>
          <Text className="text-base text-gray-500">
            Where would you like to explore?
          </Text>
        </View> */}

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
                    ? "bg-black"
                    : "bg-white border border-gray-100"
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
                    region === "South America" ? "text-white" : "text-gray-700"
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
          <Text className="text-2xl font-semibold text-gray-800">
            Featured Trips
          </Text>
        </View>

        {/* Trip Cards Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className=" max-h-80 mx-2 px-2"
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
                <View className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs">India</Text>
                </View>
                <TouchableOpacity className="absolute top-3 right-3 p-1.5 bg-white rounded-full">
                  <Feather name="more-vertical" size={18} color="black" />
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
                <View className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs">Brazil</Text>
                </View>
                <TouchableOpacity className="absolute top-3 right-3 p-1.5 bg-white rounded-full">
                  <Feather name="more-vertical" size={18} color="black" />
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
          <Text className="text-2xl font-semibold text-gray-800">
            Quick Trips
          </Text>
        </View>

        {/* Trip Cards Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className=" max-h-80 mx-2 px-2 "
        >
          <View className="flex-row">
            {/* First Card - Main Card */}

            {/* Second Card - Detail Card */}
            <View className="w-72 mr-4">
              <View className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <View className="p-3 border-b border-gray-100">
                  <Text className="font-semibold text-gray-800">
                    Goa
                  </Text>
                  <Text className="text-xs text-gray-500">India</Text>
                </View>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  className="w-full h-32"
                />
                <View className="p-3">
                  <Text className="text-gray-700 text-sm mb-2">
                    Discover the vibrant culture and stunning beaches of Rio de
                    Janeiro.
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <FontAwesome name="star" size={12} color="gold" />
                      <Text className="text-gray-700 text-xs ml-1">
                        5.0 (143)
                      </Text>
                    </View>
                    <TouchableOpacity className="bg-black px-2.5 py-1 rounded-full">
                      <Text className="text-white text-xs">Book now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View className="w-72 mr-4">
              <View className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <View className="p-3 border-b border-gray-100">
                  <Text className="font-semibold text-gray-800">
                    Church Street
                  </Text>
                  <Text className="text-xs text-gray-500">Bangalore</Text>
                </View>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1627306036351-036986f292a9?q=80&w=2648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  className="w-full h-32"
                />
                <View className="p-3">
                  <Text className="text-gray-700 text-sm mb-2">
                    Discover the vibrant culture and stunning beaches of Rio de
                    Janeiro.
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <FontAwesome name="star" size={12} color="gold" />
                      <Text className="text-gray-700 text-xs ml-1">
                        5.0 (143)
                      </Text>
                    </View>
                    <TouchableOpacity className="bg-black px-2.5 py-1 rounded-full">
                      <Text className="text-white text-xs">Book now</Text>
                    </TouchableOpacity>
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
