import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "react-native-linear-gradient";
import React from "react";

export default function TripGlideScreen() {
  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="p-5 flex-row items-start justify-between">
        <View>
          <Text className="text-3xl font-medium text-gray-800">Hello, Vanessa</Text>
          <Text className="text-gray-500">Welcome to TripGlide</Text>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
          className="w-10 h-10 rounded-full"
        />
      </View>

      {/* Search Bar */}
      <View className="px-5">
        <View className="flex-row items-center bg-white p-3 rounded-full shadow">
          <FontAwesome name="search" size={20} color="gray" className="mr-2" />
          <TextInput
            placeholder="Search"
            className="flex-1 text-gray-600"
          />
          <TouchableOpacity>
            <Feather name="sliders" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Trip Selection Tabs */}
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 px-5">
        {["Asia", "Europe", "South America", "North America"].map((region, index) => (
          <TouchableOpacity
            key={index}
            className={`px-4 py-2 mx-2 rounded-full ${
              region === "South America" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            <Text className={region === "South America" ? "text-white" : "text-gray-700"}>
              {region}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/* Featured Destination */}
      {/* <View className="px-5 mt-4">
        <View className="relative">
          <Image
            source={{ uri: "https://source.unsplash.com/600x400/?mountain" }}
            className="w-full h-48 rounded-xl"
          />
          <TouchableOpacity className="absolute top-3 right-3 p-2 bg-white rounded-full">
            <Ionicons name="heart-outline" size={20} color="black" />
          </TouchableOpacity>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            className="absolute bottom-0 left-0 right-0 p-4 rounded-b-xl"
          >
            <Text className="text-white font-semibold text-lg">Rio de Janeiro</Text>
            <Text className="text-white text-sm">Brazil</Text>
            <View className="flex-row items-center mt-1">
              <FontAwesome name="star" size={14} color="gold" />
              <Text className="text-white ml-1">5.0</Text>
              <Text className="text-white text-xs ml-2">(143 reviews)</Text>
            </View>
          </LinearGradient>
        </View>
        <TouchableOpacity className="mt-3 bg-black p-3 rounded-full flex-row justify-center">
          <Text className="text-white font-semibold">See more</Text>
          <Ionicons name="arrow-forward" size={18} color="white" className="ml-2" />
        </TouchableOpacity>
      </View> */}
{/*
      Bottom Navigation
      <View className="absolute bottom-4 left-5 right-5 bg-black p-3 rounded-full flex-row justify-around items-center">
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={24} color="white" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
