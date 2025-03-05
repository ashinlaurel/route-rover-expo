import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

export default function Personal() {
  const router = useRouter();
  const styles = useThemedStyles();
  const { isDarkMode } = useTheme();

  const stats = [
    { number: "12", label: "Trips" },
    { number: "48", label: "Places" },
    { number: "2.4k", label: "Followers" },
  ];

  const menuItems = [
    {
      icon: "person-circle-outline",
      title: "Edit Profile",
      subtitle: "Update your personal information",
      route: "/stack/editprofile"
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      subtitle: "Manage your notifications",
      route: ""
    },
    {
      icon: "settings-outline",
      title: "Settings",
      subtitle: "App settings and preferences",
      route: "/stack/settings"
    },
    {
      icon: "shield-outline",
      title: "Privacy",
      subtitle: "Manage your privacy settings",
      route: ""
    },
  ];

  return (
    <KeyboardAvoidingView   behavior={Platform.OS === "ios" ? "padding" : "height"}
    className={`flex-1 ${styles.bgPrimary}`}>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className={`px-6 pb-6 ${styles.bgSecondary} rounded-b-[40px]`}>
          <View className="flex-row items-center justify-between mb-6">
            <Text className={`text-2xl font-bold ${styles.textPrimary}`}>Profile</Text>
            <TouchableOpacity
              className={`${styles.bgPrimary} p-2 rounded-full`}
              onPress={() => router.push("/stack/editprofile")}
            >
              <Feather name="edit-2" size={20} color={styles.iconColor} />
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <View className="relative mb-4">
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
                className="w-24 h-24 rounded-full"
                style={{
                  borderWidth: 4,
                  borderColor: isDarkMode ? '#374151' : '#f3f4f6',
                }}
              />
              <View className={`absolute bottom-0 right-0 ${styles.buttonPrimary} p-2 rounded-full`}>
                <Ionicons name="camera" size={14} color={styles.buttonPrimaryText} />
              </View>
            </View>

            <Text className={`text-xl font-semibold ${styles.textPrimary} mb-1`}>
              Vanessa Smith
            </Text>
            <Text className={`${styles.textSecondary} mb-6`}>
              Travel Enthusiast
            </Text>

            {/* Stats Row */}
            <View className="flex-row justify-between w-full max-w-xs">
              {stats.map((stat, index) => (
                <View key={index} className="items-center">
                  <Text className={`text-2xl font-bold ${styles.textPrimary}`}>
                    {stat.number}
                  </Text>
                  <Text className={styles.textSecondary}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Trips */}
        <View className="px-6 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-xl font-semibold ${styles.textPrimary}`}>
              Recent Trips
            </Text>
            <TouchableOpacity>
              <Text className={styles.textSecondary}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            {/* Trip Cards */}
            <TouchableOpacity
              className="mr-4 w-72"
              onPress={() => router.push("/stack/trips")}
            >
              <View className={`${styles.cardBg} rounded-2xl overflow-hidden`}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1548013146-72479768bada",
                  }}
                  className="w-full h-32"
                />
                <View className="p-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className={`font-semibold ${styles.textPrimary}`}>Agra Trip</Text>
                    <View className={`${styles.bgSecondary} px-2 py-1 rounded-full`}>
                      <Text className={styles.textSecondary}>Completed</Text>
                    </View>
                  </View>
                  <Text className={styles.textSecondary}>March 2024</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="mr-4 w-72">
              <View className={`${styles.cardBg} rounded-2xl overflow-hidden`}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
                  }}
                  className="w-full h-32"
                />
                <View className="p-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className={`font-semibold ${styles.textPrimary}`}>Goa Beach</Text>
                    <View className={`${styles.bgSecondary} px-2 py-1 rounded-full`}>
                      <Text className={styles.textSecondary}>Upcoming</Text>
                    </View>
                  </View>
                  <Text className={styles.textSecondary}>April 2024</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View className="px-6 mt-6">
          <Text className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>
            Settings
          </Text>
          <View className="space-y-3">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => item.route && router.push(item.route as any)}
                className={`flex-row items-center ${styles.cardBg} p-4 rounded-2xl`}
              >
                <View className={`${styles.bgSecondary} p-3 rounded-xl`}>
                  <Ionicons name={item.icon as any} size={22} color={styles.iconColor} />
                </View>
                <View className="flex-1 ml-4">
                  <Text className={`font-medium ${styles.textPrimary}`}>{item.title}</Text>
                  <Text className={`text-sm ${styles.textSecondary}`}>{item.subtitle}</Text>
                </View>
                <Feather name="chevron-right" size={20} color={styles.iconColorMuted} />
              </TouchableOpacity>
            ))}

            {/* Logout Button */}
            <TouchableOpacity
              className={`flex-row items-center ${styles.cardBg} p-4 rounded-2xl mt-4`}
              onPress={() => router.push("/stack/login")}
            >
              <View className="p-3 rounded-xl bg-red-100">
                <Ionicons name="log-out-outline" size={22} color="red" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="font-medium text-red-500">Logout</Text>
                <Text className="text-sm text-red-400">Sign out of your account</Text>
              </View>
              <Feather name="chevron-right" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
