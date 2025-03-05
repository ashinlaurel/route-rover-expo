import * as ImagePicker from 'expo-image-picker';

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function EditProfile() {
  const [name, setName] = useState("Vanessa Smith");
  const [email, setEmail] = useState("vanessa@example.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [bio, setBio] = useState("Travel Enthusiast");
  const [image, setImage] = useState("https://randomuser.me/api/portraits/women/1.jpg");
  const [showModal, setShowModal] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Permission Needed",
          "Please grant permission to access your photos to change your profile picture.",
          [{ text: "OK" }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setShowModal(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission needed to use camera");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setShowModal(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView>
        {/* Header */}
        <View className="relative pt-14 pb-6 px-5 border-b border-gray-100">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-5 top-14"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-center text-gray-800">
            Edit Profile
          </Text>
        </View>

        {/* Profile Picture Section */}
        <View className="items-center py-6">
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="relative"
          >
            <Image
              source={{ uri: image }}
              className="w-24 h-24 rounded-full"
              style={{
                borderWidth: 2,
                borderColor: '#f3f4f6',
              }}
            />
            <View
              className="absolute bottom-0 right-0 bg-black p-2 rounded-full"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <Ionicons name="camera-outline" size={14} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Custom Modal for Image Selection */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View className="flex-1 bg-black bg-opacity-50 justify-end">
              <TouchableWithoutFeedback>
                <View className="bg-white rounded-t-3xl">
                  <View className="p-6">
                    <View className="items-center mb-6">
                      <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
                      <Text className="text-xl font-semibold text-gray-800">
                        Change Profile Picture
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={takePhoto}
                      className="flex-row items-center p-4 mb-4 bg-gray-50 rounded-2xl"
                    >
                      <View className="bg-black p-2 rounded-xl">
                        <Ionicons name="camera-outline" size={24} color="white" />
                      </View>
                      <View className="ml-4">
                        <Text className="text-gray-800 font-semibold text-lg">
                          Take Photo
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          Use your camera to take a new photo
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={pickImage}
                      className="flex-row items-center p-4 mb-6 bg-gray-50 rounded-2xl"
                    >
                      <View className="bg-black p-2 rounded-xl">
                        <Ionicons name="images-outline" size={24} color="white" />
                      </View>
                      <View className="ml-4">
                        <Text className="text-gray-800 font-semibold text-lg">
                          Choose from Library
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          Select from your photo gallery
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setShowModal(false)}
                      className="bg-gray-100 py-4 rounded-2xl"
                    >
                      <Text className="text-gray-700 text-center font-semibold">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Form Fields */}
        <View className="px-5 space-y-4">
          {/* Name Input */}
          <View>
            <Text className="text-gray-600 mb-2 ml-1">Full Name</Text>
            <View className="flex-row items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
              <View className="bg-gray-50 p-2 rounded-xl">
                <Ionicons name="person-outline" size={20} color="black" />
              </View>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                className="flex-1 ml-3 text-gray-700"
              />
            </View>
          </View>

          {/* Email Input */}
          <View>
            <Text className="text-gray-600 mb-2 ml-1">Email</Text>
            <View className="flex-row items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
              <View className="bg-gray-50 p-2 rounded-xl">
                <Ionicons name="mail-outline" size={20} color="black" />
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                className="flex-1 ml-3 text-gray-700"
              />
            </View>
          </View>

          {/* Phone Input */}
          <View>
            <Text className="text-gray-600 mb-2 ml-1">Phone Number</Text>
            <View className="flex-row items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
              <View className="bg-gray-50 p-2 rounded-xl">
                <Ionicons name="call-outline" size={20} color="black" />
              </View>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                className="flex-1 ml-3 text-gray-700"
              />
            </View>
          </View>

          {/* Bio Input */}
          <View>
            <Text className="text-gray-600 mb-2 ml-1">Bio</Text>
            <View className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
              <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Write something about yourself"
                multiline
                numberOfLines={4}
                className="text-gray-700"
                style={{ height: 100, textAlignVertical: 'top' }}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black py-4 rounded-2xl mt-6"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
