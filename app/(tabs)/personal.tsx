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

export default function Personal() {
  const router = useRouter();

  return (
    <View className="bg-white h-full">
      {/* Header with Profile Info */}
      <View className="p-8 pb-8 ">
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
            className="w-20 h-20 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-2xl font-semibold text-gray-800">
              Vanessa Smith
            </Text>
            <Text className="text-gray-500">Travel Enthusiast</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mt-6 px-10">
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-800">12</Text>
            <Text className="text-gray-500">Trips</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-800">48</Text>
            <Text className="text-gray-500">Places</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-800">2.4k</Text>
            <Text className="text-gray-500">Followers</Text>
          </View>
        </View>
      </View>

      <ScrollView className="pl-3">
        {/* My Trips Section */}
        <View className="mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            My Trips
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="space-x-4"
          >
            {/* Trip Card 1 */}
            <TouchableOpacity
              className="w-72 m-2"
              onPress={() => router.push("/stack/trips")}
            >
              <View className="relative">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1548013146-72479768bada",
                  }}
                  className="w-full h-48 rounded-xl"
                />
                <View className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs">Completed</Text>
                </View>
                <View className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-white font-bold text-xl">Agra Trip</Text>
                  <Text className="text-white text-sm">March 2024</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Trip Card 2 */}
            <TouchableOpacity className="w-72 m-2">
              <View className="relative">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
                  }}
                  className="w-full h-48 rounded-xl"
                />
                <View className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs">Upcoming</Text>
                </View>
                <View className="absolute bottom-0 left-0 right-0 p-4">
                  <Text className="text-white font-bold text-xl">Goa Beach</Text>
                  <Text className="text-white text-sm">April 2024</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Account Settings */}
        <View className="mb-6 ">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Account Settings
          </Text>
          <View className="space-y-4">
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Ionicons name="person-circle-outline" size={24} color="black" />
                <Text className="ml-3 text-gray-800">Edit Profile</Text>
              </View>
              <Feather name="chevron-right" size={20} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Ionicons name="notifications-outline" size={24} color="black" />
                <Text className="ml-3 text-gray-800">Notifications</Text>
              </View>
              <Feather name="chevron-right" size={20} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Ionicons name="settings-outline" size={24} color="black" />
                <Text className="ml-3 text-gray-800">Settings</Text>
              </View>
              <Feather name="chevron-right" size={20} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Ionicons name="log-out-outline" size={24} color="red" />
                <Text className="ml-3 text-red-500">Logout</Text>
              </View>
              <Feather name="chevron-right" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
