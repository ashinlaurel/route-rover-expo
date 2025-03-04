import {
  Animated,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import { useRouter } from "expo-router";

export default function CreateTrip() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("Adventure");

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-6 pb-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-semibold text-gray-800">
              Create Trip
            </Text>
            <Text className="text-base text-gray-500 mt-1">
              Plan your next adventure
            </Text>
          </View>
          <TouchableOpacity
            className="bg-black px-6 py-2.5 rounded-full shadow-sm"
            onPress={() => router.push("/(tabs)/mainfeed")}
          >
            <Text className="text-white font-medium">Create</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Trip Name Input */}
        <View className="mb-8 mt-6">
          <Text className="text-base font-medium text-gray-800 mb-3">Trip Name</Text>
          <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100">
            <Feather name="map-pin" size={20} color="#6B7280" />
            <TextInput
              placeholder="Enter trip name"
              className="flex-1 ml-3 text-gray-800 text-base"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Date Selection */}
        <View className="mb-8">
          <Text className="text-base font-medium text-gray-800 mb-3">Trip Dates</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100">
              <Feather name="calendar" size={20} color="#6B7280" />
              <Text className="ml-3 text-gray-500">Start Date</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100">
              <Feather name="calendar" size={20} color="#6B7280" />
              <Text className="ml-3 text-gray-500">End Date</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trip Type */}
        <View className="mb-8">
          <Text className="text-base font-medium text-gray-800 mb-3">Trip Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-2"
          >
            {["Adventure", "Beach", "City", "Cultural", "Nature"].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-xl border m-2 ${
                  selectedType === type
                    ? "bg-black border-black"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`${
                    selectedType === type ? "text-white" : "text-gray-700"
                  } font-medium`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Duration and Budget */}
        <View className="mb-8">
          <Text className="text-base font-medium text-gray-800 mb-3">Trip Details</Text>
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100">
                <Feather name="clock" size={20} color="#6B7280" />
                <TextInput
                  placeholder="Days"
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100">
                <Feather name="dollar-sign" size={20} color="#6B7280" />
                <TextInput
                  placeholder="Budget"
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Destination */}
        <View className="mb-8">
          <Text className="text-base font-medium text-gray-800 mb-3">Destination</Text>
          <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3.5 border border-gray-100">
            <Feather name="map" size={20} color="#6B7280" />
            <TextInput
              placeholder="Where are you going?"
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Description */}
        <View className="mb-8">
          <Text className="text-base font-medium text-gray-800 mb-3">Description</Text>
          <View className="bg-gray-50 rounded-2xl px-4 py-4 border border-gray-100">
            <TextInput
              placeholder="Write something about your trip..."
              className="text-gray-800 min-h-[100]"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
