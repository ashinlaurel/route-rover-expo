// import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import {
  Dimensions,
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
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { Ionicons } from "@expo/vector-icons";
// import auth from "@react-native-firebase/auth";

// Configure Google Sign-in
// GoogleSignin.configure({
//   webClientId: "YOUR_GOOGLE_WEB_CLIENT_ID",
// });

export default function LoginScreen() {
  const router = useRouter();
  const { login, googleSignIn, facebookSignIn, user, isLoading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("email");
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (user && !isLoading) {
      // If user is already logged in, redirect to main feed
      router.replace('/mainfeed');
    }
  }, [user, isLoading]);

  // If still loading, you might want to show a loading screen
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  // If user is logged in, don't render the login screen
  if (user) {
    return null;
  }

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login Error:", error);
      // Here you might want to show an error message to the user
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          {/* Top Decoration */}
          <View className="w-full h-52 bg-white items-center justify-end pb-6">
            <View className="w-30 h-30  rounded-3xl items-center justify-center">
              <Ionicons
                name="balloon-outline"
                size={70}
                color="black"
              />
            </View>
          </View>

          {/* Main Content */}
          <View className="px-5 -mt-6">
            {/* Welcome Text */}
            <View className="bg-white rounded-3xl px-6 py-6 shadow-sm border border-gray-50">
              <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
                Welcome Back
              </Text>
              <Text className="text-gray-500 text-center mb-6">
                Login to access your account
              </Text>

              <View className="flex-row bg-gray-100 rounded-full p-1 w-full">
                <TouchableOpacity
                  className={`flex-1 m-1 py-3 items-center rounded-full ${
                    loginType === "email" ? "bg-black" : ""
                  }`}
                  onPress={() => setLoginType("email")}
                >
                  <Text className={`font-semibold ${loginType === "email" ? "text-white" : "text-gray-700"}`}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 m-1 py-3 items-center rounded-full ${
                    loginType === "phone" ? "bg-black" : ""
                  }`}
                  onPress={() => setLoginType("phone")}
                >
                  <Text className={`font-semibold ${loginType === "phone" ? "text-white" : "text-gray-700"}`}>Phone</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Input Fields */}
            <View className="mt-6">
              {loginType === "phone" ? (
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
                      placeholder="Enter your phone number"
                      className="flex-1 ml-3 text-gray-700"
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>
              ) : (
                <>
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
                        placeholder="Enter your email"
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
                          name="lock-closed-outline"
                          size={20}
                          color="black"
                        />
                      </View>
                      <TextInput
                        placeholder="Enter your password"
                        className="flex-1 ml-3 text-gray-700"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                      />
                    </View>
                  </View>
                </>
              )}

              {/* Forgot Password */}
              {loginType === "email" && (
                <TouchableOpacity className="mb-6">
                  <Text className="text-black font-medium text-right">Forgot Password?</Text>
                </TouchableOpacity>
              )}

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                className="rounded-2xl bg-black items-center py-4 shadow-sm"
              >
                <Text className="text-lg font-semibold text-white">Login</Text>
              </TouchableOpacity>

              {/* Social Logins */}
              <View className="my-6">
                <Text className="text-gray-500 text-center mb-4">
                  Or continue with
                </Text>
                <View className="flex-row justify-center mb-4">
                  {/* Google Login */}
                  <TouchableOpacity
                    onPress={handleGoogleSignIn}
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
                    onPress={handleFacebookLogin}
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

              {/* Signup Redirect */}
              <View className="flex-row justify-center mt-2">
                <Text className="text-gray-600">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/stack/signup")}>
                  <Text className="text-black font-semibold">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
