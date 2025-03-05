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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUser } from '../context/UserContext';

export default function SignupScreen() {
  const { signup, user, isLoading } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace('/mainfeed');
    }
  }, [user]);

  const handleSignup = async () => {
    if (!name || !email || !password || !phone) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setError("");
      setIsRegistering(true);
      await signup(email, password, name, phone);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

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
          <View className="px-5">
            {/* Welcome Text */}
            <View className="bg-white rounded-3xl px-6 py-6">
              <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
                Create Account
              </Text>
              <Text className="text-gray-500 text-center">
                Sign up to get started
              </Text>
            </View>

            {/* Error Message */}
            {error ? (
              <View className="mb-4 p-3 bg-red-50 rounded-xl">
                <Text className="text-red-500 text-center">{error}</Text>
              </View>
            ) : null}

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
                onPress={handleSignup}
                disabled={isRegistering}
                className={`rounded-2xl bg-black items-center py-4 shadow-sm ${isRegistering ? 'opacity-70' : ''}`}
              >
                {isRegistering ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-lg font-semibold text-white">Sign Up</Text>
                )}
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
