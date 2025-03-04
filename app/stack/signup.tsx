import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          {/* Top Decoration */}
          <View className="w-full h-40 bg-white items-center justify-end pb-6">
            <View className="w-30 h-30 rounded-3xl items-center justify-center">
              <Ionicons
                name="key-outline"
                size={70}
                color="black"
              />
            </View>
          </View>

          {/* Main Content */}
          <View className="px-5 -mt-6">
            {/* Welcome Text */}
            <View className="bg-white rounded-3xl px-6 py-6">
              <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
                Create Account
              </Text>
              <Text className="text-gray-500 text-center">
                Sign up to get started
              </Text>
            </View>

            {/* Input Fields */}
            <View className="mt-6">
              <View className="mb-4">
                <View className="flex-row items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                  <View className="bg-gray-50 p-2 rounded-xl">
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="black"
                    />
                  </View>
                  <TextInput
                    placeholder="Full Name"
                    className="flex-1 ml-3 text-gray-700"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View className="mb-4">
                <View className="flex-row items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                  <View className="bg-gray-50 p-2 rounded-xl">
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="black"
                    />
                  </View>
                  <TextInput
                    placeholder="Email"
                    className="flex-1 ml-3 text-gray-700"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              <View className="mb-4">
                <View className="flex-row items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                  <View className="bg-gray-50 p-2 rounded-xl">
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color="black"
                    />
                  </View>
                  <TextInput
                    placeholder="Phone Number"
                    className="flex-1 ml-3 text-gray-700"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>

              <View className="mb-4">
                <View className="flex-row items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                  <View className="bg-gray-50 p-2 rounded-xl">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="black"
                    />
                  </View>
                  <TextInput
                    placeholder="Password"
                    className="flex-1 ml-3 text-gray-700"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={() => router.push("/mainfeed")}
                className="rounded-2xl bg-black items-center py-4 shadow-sm"
              >
                <Text className="text-lg font-semibold text-white">Sign Up</Text>
              </TouchableOpacity>

              {/* Social Logins */}
              <View className="my-6">
                <Text className="text-gray-500 text-center mb-4">
                  Or sign up with
                </Text>
                <View className="flex-row justify-center mb-4">
                  {/* Google Login */}
                  <TouchableOpacity
                    className="flex-row items-center bg-white border border-gray-200 py-3 px-8 rounded-2xl shadow-sm mx-2"
                  >
                    <AntDesign
                      name="google"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>

                  {/* Facebook Login */}
                  <TouchableOpacity
                    className="flex-row items-center bg-white border border-gray-200 py-3 px-8 rounded-2xl shadow-sm mx-2"
                  >
                    <Ionicons
                      name="logo-facebook"
                      size={22}
                      color="black"
                    />
                  </TouchableOpacity>

                  {/* Apple Login */}
                  <TouchableOpacity
                    className="flex-row items-center bg-white border border-gray-200 py-3 px-8 rounded-2xl shadow-sm mx-2"
                  >
                    <AntDesign
                      name="apple1"
                      size={22}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Redirect */}
              <View className="flex-row justify-center mt-2">
                <Text className="text-gray-600">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/stack/login")}>
                  <Text className="text-black font-semibold">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
