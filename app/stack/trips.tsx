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

export default function TripScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      {/* Header */}
      <View className="p-5 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-medium text-gray-800">
            Agra Trip 2024
          </Text>
          <Text className="text-gray-500">The trip at a glance</Text>
        </View>
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
            className="w-10 h-10 rounded-full"
          />
          <TouchableOpacity className="ml-3">
            <Ionicons name="settings-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>



      <ScrollView className="">


        {/* Trip Selection Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 mb-6 max-h-14"
        >
          {["Day 1", "Day 2", "Day 3", "Day 4"].map(
            (region, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-3 mr-3 rounded-full ${
                  region === "Day 1"
                    ? "bg-black"
                    : "bg-white border border-gray-100"
                }`}
                style={{
                  minWidth: region === "Day 1" ? 140 : 90,
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
                    region === "Day 1" ? "text-white" : "text-gray-700"
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
            At A Glance
          </Text>
        </View>

        {/* Trip Cards Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className=" max-h-32 mx-2 px-2"
        >
          <View className="flex-row">
            {/* First Card - Main Card */}
            <TouchableOpacity className="w-72 mr-4 text-black bg-gray-100 rounded-lg">
              <View className="relative flex items-center justify-center">

                <View className="absolute top-3 left-3  bg-opacity-70 px-3 py-1 rounded-lg bg-black ">
                  <Text className="text-white text-xs">Expenses</Text>
                </View>
                <View className="mx-2 py-10 ">
                  <Text className="text-6xl"> $100</Text>
                </View>

              </View>
            </TouchableOpacity>

             {/* First Card - Main Card */}
             <TouchableOpacity className="w-72 mr-4 text-black bg-gray-100 rounded-lg">
              <View className="relative flex items-center justify-center">

                <View className="absolute top-3 left-3  bg-opacity-70 px-3 py-1 rounded-lg bg-black ">
                  <Text className="text-white text-xs">Distance</Text>
                </View>
                <View className="mx-2 py-10 ">
                  <Text className="text-6xl"> 45 KMs</Text>
                </View>

              </View>
            </TouchableOpacity>


          </View>
        </ScrollView>


        <View className="px-5 my-4">
          <Text className="text-2xl font-semibold text-gray-800">
            Places Visited
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
            <TouchableOpacity className="w-72 mr-4">
              <View className="relative">
                <Image
                  source={{
                    uri: "https://storiesofraku.com/wp-content/uploads/2022/11/Taj-Mahal-scenic-picture-1024x730.jpeg",
                  }}
                  className="w-full h-64 rounded-xl"
                />
                <View className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs">Tajganj</Text>
                </View>
                <TouchableOpacity className="absolute top-3 right-3 p-1.5 bg-white rounded-full">
                  <Feather name="more-vertical" size={18} color="black" />
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

            <View className="w-72 mr-4">
              <View className="relative">
                <Image
                  source={{
                    uri: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/75000/75500-Agra-Fort.jpg",
                  }}
                  className="w-full h-64 rounded-xl"
                />
                <View className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs">Agra</Text>
                </View>
                <TouchableOpacity className="absolute top-3 right-3 p-1.5 bg-white rounded-full">
                  <Feather name="more-vertical" size={18} color="black" />
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
          <Text className="text-2xl font-semibold text-gray-800">
            Food
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

            {/* Second Card - Detail Card */}
            <View className="w-72 mr-4">
              <View className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <View className="p-3 border-b border-gray-100">
                  <Text className="font-semibold text-gray-800">Joney's Place
                  </Text>
                  <Text className="text-xs text-gray-500">India</Text>
                </View>
                <Image
                  source={{
                    uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/96/fa/14/restaurant.jpg?w=600&h=-1&s=1",
                  }}
                  className="w-full h-32"
                />
                <View className="p-3">
                  <Text className="text-gray-700 text-sm mb-2">
                    Discover the traditional food of Agra
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <FontAwesome name="star" size={12} color="gold" />
                      <Text className="text-gray-700 text-xs ml-1">
                        5.0 (143)
                      </Text>
                    </View>
                    {/* <TouchableOpacity className="bg-black px-2.5 py-1 rounded-full">
                      <Text className="text-white text-xs">Book now</Text>
                    </TouchableOpacity> */}
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
                    {/* <TouchableOpacity className="bg-black px-2.5 py-1 rounded-full">
                      <Text className="text-white text-xs">Book now</Text>
                    </TouchableOpacity> */}
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
