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
      className="flex-1 bg-white justify-center px-5"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 ">
          {/* Welcome Text */}
          <Text className="text-4xl font-bold text-gray-800 text-center mb-2 mt-20">
            Create Account
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            Sign up to get started
          </Text>

          {/* Input Fields */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-200 p-3 rounded-full">
              <Ionicons name="person-outline" size={18} color="gray" className="mr-2" />
              <TextInput
                placeholder="Full Name"
                className="flex-1 text-gray-700"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center border border-gray-200 p-3 rounded-full">
              <Ionicons name="mail-outline" size={18} color="gray" className="mr-2" />
              <TextInput
                placeholder="Email"
                className="flex-1 text-gray-700"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center border border-gray-200 p-3 rounded-full">
              <Ionicons name="call-outline" size={18} color="gray" className="mr-2" />
              <TextInput
                placeholder="Phone Number"
                className="flex-1 text-gray-700"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center border border-gray-200 p-3 rounded-full">
              <Ionicons name="lock-closed-outline" size={18} color="gray" className="mr-2" />
              <TextInput
                placeholder="Password"
                className="flex-1 text-gray-700"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity className="rounded-full bg-green-300 items-center py-4">
            <Text className="text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>

          {/* Social Signups */}
          <View className="my-6 ">
            <Text className="text-gray-500 text-center mb-4">Or sign up with</Text>
            <View className="flex flex-row items-center justify-evenly mt-4">
              {/* Google Signup */}
              <TouchableOpacity className="flex-row items-center bg-gray-100 py-5 px-12 rounded-full mb-3">
                <AntDesign name="google" size={20} color="black" className="mr-3" />
                <Text className="text-gray-700 font-semibold">Google</Text>
              </TouchableOpacity>

              {/* Facebook Signup */}
              <TouchableOpacity className="flex-row items-center bg-gray-100 py-5 px-12 rounded-full mb-3">
                <Ionicons name="logo-facebook" size={22} color="black" className="mr-3" />
                <Text className=" font-semibold">Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Redirect */}
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text className="text-blue-500 font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
