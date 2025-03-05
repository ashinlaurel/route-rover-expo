import { Feather, Ionicons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const itemBgColor = isDarkMode ? "bg-gray-800" : "bg-gray-50";
  const borderColor = isDarkMode ? "border-gray-800" : "border-gray-100";

  return (
    <View className={`flex-1 ${bgColor}`}>
      {/* Header */}
      <View className={`p-4 border-b ${borderColor} flex-row items-center`}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text className={`text-xl font-semibold ${textColor} ml-2`}>Settings</Text>
      </View>

      <ScrollView className="flex-1">
        {/* General Settings */}
        <View className="p-4">
          <Text className={`text-lg font-semibold ${textColor} mb-4`}>
            General
          </Text>
          <View className="space-y-4">
            <View className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="notifications-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>Notifications</Text>
                  <Text className={subTextColor}>
                    Receive push notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#D1D5DB", true: "#000000" }}
              />
            </View>

            <View className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="moon-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>Dark Mode</Text>
                  <Text className={subTextColor}>
                    Switch to dark theme
                  </Text>
                </View>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: "#D1D5DB", true: "#000000" }}
              />
            </View>

            <View className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>
                    Location Services
                  </Text>
                  <Text className={subTextColor}>
                    Enable location tracking
                  </Text>
                </View>
              </View>
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: "#D1D5DB", true: "#000000" }}
              />
            </View>

            <View className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="mail-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>Email Updates</Text>
                  <Text className={subTextColor}>
                    Receive email notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={emailUpdates}
                onValueChange={setEmailUpdates}
                trackColor={{ false: "#D1D5DB", true: "#000000" }}
              />
            </View>
          </View>
        </View>

        {/* Privacy & Security */}
        <View className="p-4">
          <Text className={`text-lg font-semibold ${textColor} mb-4`}>
            Privacy & Security
          </Text>
          <View className="space-y-4">
            <TouchableOpacity className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="lock-closed-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>
                    Change Password
                  </Text>
                  <Text className={subTextColor}>
                    Update your password
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "white" : "gray"} />
            </TouchableOpacity>

            <TouchableOpacity className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="shield-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>
                    Privacy Settings
                  </Text>
                  <Text className={subTextColor}>
                    Manage your privacy
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "white" : "gray"} />
            </TouchableOpacity>

            <TouchableOpacity className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="finger-print-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>
                    Two-Factor Authentication
                  </Text>
                  <Text className={subTextColor}>
                    Add extra security
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "white" : "gray"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View className="p-4">
          <Text className={`text-lg font-semibold ${textColor} mb-4`}>About</Text>
          <View className="space-y-4">
            <TouchableOpacity className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="information-circle-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>App Version</Text>
                  <Text className={subTextColor}>1.0.0</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="document-text-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>Terms of Use</Text>
                  <Text className={subTextColor}>Read our terms</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "white" : "gray"} />
            </TouchableOpacity>

            <TouchableOpacity className={`flex-row items-center justify-between ${itemBgColor} p-4 rounded-xl`}>
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark-outline" size={24} color={isDarkMode ? "white" : "black"} />
                <View className="ml-3">
                  <Text className={`font-medium ${textColor}`}>
                    Privacy Policy
                  </Text>
                  <Text className={subTextColor}>
                    Read our privacy policy
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color={isDarkMode ? "white" : "gray"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
