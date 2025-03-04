// import { AccessToken, LoginManager } from "react-native-fbsdk-next";
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
import React, { useEffect, useState } from "react";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("email");

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      // await GoogleSignin.hasPlayServices();
      // const { idToken } = await GoogleSignin.signIn();
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // await auth().signInWithCredential(googleCredential);
      console.log("Google Sign-in successful!");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      // const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
      // if (result.isCancelled) {
      //   console.log("Facebook login cancelled.");
      //   return;
      // }
      // const data = await AccessToken.getCurrentAccessToken();
      // if (!data) {
      //   console.error("Something went wrong obtaining access token.");
      //   return;
      // }
      // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      // await auth().signInWithCredential(facebookCredential);
      console.log("Facebook Login Successful!");
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white justify-center px-5"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 ">
          {/* App Logo */}
          {/* <View className="items-center mb-8">
            <Image
              source={{ uri: "https://your-logo-url.com/logo.png" }}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </View> */}

          {/* Welcome Text */}
          <Text className="text-4xl font-bold text-gray-800 text-center mb-2 mt-20">
            Welcome Back
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            Login to access your account
          </Text>

          <View className="flex-row bg-gray-100 rounded-full p-1 w-full">
            <TouchableOpacity
              className={`flex-1 m-2 p-6 items-center rounded-full ${
                loginType === "email" ? "bg-green-300" : ""
              }`}
              onPress={() => setLoginType("email")}
            >
              <Text className="font-semibold">Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 m-2 p-6 items-center rounded-full ${
                loginType === "phone" ? "bg-green-300" : ""
              }`}
              onPress={() => setLoginType("phone")}
            >
              <Text className="font-semibold">Phone Number</Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          {loginType === "phone" ? (
            <View className="mb-4 mt-6">
              <View className="flex-row items-center border border-gray-200 p-3 rounded-full">
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="gray"
                  className="mr-2"
                />
                <TextInput
                  placeholder="Enter your phone number"
                  className="flex-1 text-gray-700"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={email}
                />
              </View>
            </View>
          ) : (
            <>
              <View className="mb-4 mt-6">
                <View className="flex-row items-center border border-gray-200 p-3 rounded-full">
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color="gray"
                    className="mr-2"
                  />
                  <TextInput
                    placeholder="Enter your email"
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
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="gray"
                    className="mr-2"
                  />
                  <TextInput
                    placeholder="Enter your password"
                    className="flex-1 text-gray-700"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
            </>
          )}

          {/* Forgot Password */}
          {loginType == "email" && (
            <TouchableOpacity className="mb-6">
              <Text className="text-gray text-right">Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {/* Login Button */}
          <TouchableOpacity onPress={() => router.push("/mainfeed")} className="rounded-full bg-green-300 items-center py-4">
            <Text className="text-lg font-semibold">Login</Text>
          </TouchableOpacity>

          {/* Social Logins */}
          <View className="my-6 ">
            <Text className="text-gray-500 text-center mb-4">
              Or continue with
            </Text>
            <View className="flex flex-row items-center justify-evenly mt-4">
              {/* Google Login */}
              <TouchableOpacity
                onPress={handleGoogleSignIn}
                className="flex-row items-center bg-gray-100 py-5 px-12 rounded-full mb-3"
              >
                <AntDesign
                  name="google"
                  size={20}
                  color="black"
                  className="mr-3"
                />
                <Text className="text-gray-700 font-semibold">Google</Text>
              </TouchableOpacity>

              {/* Facebook Login */}
              <TouchableOpacity
                onPress={handleFacebookLogin}
                className="flex-row items-center bg-gray-100 py-5 px-12 rounded-full mb-3"
              >
                <Ionicons
                  name="logo-facebook"
                  size={22}
                  color="black"
                  className="mr-3"
                />
                <Text className=" font-semibold">Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Signup Redirect */}
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text className="text-blue-500 font-semibold">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
