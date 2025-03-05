import {
  ActivityIndicator,
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";

import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useThemedStyles } from "../hooks/useThemedStyles";

type TripType = {
  id: string;
  name: string;
  icon: 'person' | 'people' | 'people-circle' | 'briefcase' | 'compass' | 'sunny';
};

export default function CreateTrip() {
  const router = useRouter();
  const styles = useThemedStyles();
  const { isDarkMode } = useTheme();
  const [selectedType, setSelectedType] = useState("Adventure");
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tripTypes: TripType[] = [
    { id: 'solo', name: 'Solo', icon: 'person' },
    { id: 'family', name: 'Family', icon: 'people' },
    { id: 'friends', name: 'Friends', icon: 'people-circle' },
    { id: 'business', name: 'Business', icon: 'briefcase' },
    { id: 'adventure', name: 'Adventure', icon: 'compass' },
    { id: 'relaxation', name: 'Relaxation', icon: 'sunny' },
  ];

  const handleImagePick = () => {
    // Image picker functionality will be implemented later
    console.log("Pick image");
  };

  const handleCreateTrip = () => {
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.back();
    }, 2000);
  };

  const getIconName = (type: TripType) => {
    return `${type.icon}${selectedType !== type.name ? '-outline' : ''}` as const;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderDatePicker = (
    isStart: boolean,
    visible: boolean,
    onClose: () => void,
    currentDate: Date,
    onDateChange: (date: Date) => void
  ) => {
    const today = new Date();
    const dates = Array.from({ length: 90 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date;
    });

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
          className={styles.overlayBg}
        >
          <View className="flex-1 justify-end">
            <View className={`${styles.cardBg} rounded-t-3xl`}>
              <View className="p-4 border-b border-gray-200">
                <Text className={`text-lg font-semibold ${styles.textPrimary}`}>
                  Select {isStart ? 'Start' : 'End'} Date
                </Text>
              </View>
              <ScrollView className="max-h-96 p-4">
                {dates.map((date) => (
                  <TouchableOpacity
                    key={date.toISOString()}
                    onPress={() => {
                      onDateChange(date);
                      onClose();
                    }}
                    className={`py-3 px-4 mb-2 rounded-xl ${
                      date.toDateString() === currentDate.toDateString()
                        ? styles.buttonPrimary
                        : styles.bgSecondary
                    }`}
                  >
                    <Text
                      className={`${
                        date.toDateString() === currentDate.toDateString()
                          ? styles.buttonPrimaryText
                          : styles.textPrimary
                      }`}
                    >
                      {formatDate(date)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 ${styles.bgPrimary}`}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#111827" : "#FFFFFF"}
      />

      {/* Date Picker Modals */}
      {renderDatePicker(
        true,
        showStartDate,
        () => setShowStartDate(false),
        startDate,
        setStartDate
      )}
      {renderDatePicker(
        false,
        showEndDate,
        () => setShowEndDate(false),
        endDate,
        setEndDate
      )}

      <ScrollView className="flex-1">
        {/* Header with Image Upload */}
        <View className="relative h-48">
          <TouchableOpacity
            onPress={handleImagePick}
            className={`h-full w-full items-center justify-center ${styles.bgSecondary}`}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className="h-full w-full"
                style={{ resizeMode: "cover" }}
              />
            ) : (
              <View className="items-center">
                <Ionicons name="image-outline" size={40} color={styles.iconColor} />
                <Text className={`mt-2 ${styles.textSecondary}`}>Add Cover Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            className={`absolute top-12 left-4 p-2 rounded-full ${styles.bgSecondary}`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Ionicons name="arrow-back" size={24} color={styles.iconColor} />
          </TouchableOpacity>
        </View>

        {/* Form Content */}
        <View className="px-6 -mt-6 rounded-t-3xl">
          <View className={`${styles.cardBg} rounded-3xl p-6 shadow-lg`}>
            {/* Title */}
            <View className="mb-8">
              <Text className={`text-3xl font-bold ${styles.textPrimary}`}>
                Create New Trip
              </Text>
              <Text className={`mt-2 ${styles.textSecondary}`}>
                Fill in the details for your next adventure
              </Text>
            </View>

            {/* Trip Details Form */}
            <View className="space-y-6">
              {/* Trip Name */}
              <View>
                <Text className={`text-base font-medium mb-2 ${styles.textPrimary}`}>Trip Name</Text>
                <View className={`flex-row items-center ${styles.inputBg} rounded-xl px-4 py-3`}>
                  <Ionicons name="bookmark-outline" size={20} color={styles.iconColorMuted} />
                  <TextInput
                    placeholder="Enter trip name"
                    className={`flex-1 ml-3 ${styles.inputText}`}
                    placeholderTextColor={styles.iconColorMuted}
                  />
                </View>
              </View>

              {/* Destination */}
              <View>
                <Text className={`text-base font-medium mb-2 ${styles.textPrimary}`}>Destination</Text>
                <View className={`flex-row items-center ${styles.inputBg} rounded-xl px-4 py-3`}>
                  <Ionicons name="location-outline" size={20} color={styles.iconColorMuted} />
                  <TextInput
                    placeholder="Where are you going?"
                    className={`flex-1 ml-3 ${styles.inputText}`}
                    placeholderTextColor={styles.iconColorMuted}
                  />
                </View>
              </View>

              {/* Dates */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className={`text-base font-medium mb-2 ${styles.textPrimary}`}>Start Date</Text>
                  <TouchableOpacity
                    onPress={() => setShowStartDate(true)}
                    className={`flex-row items-center ${styles.inputBg} rounded-xl px-4 py-3`}
                  >
                    <Ionicons name="calendar-outline" size={20} color={styles.iconColorMuted} />
                    <Text className={`ml-3 ${styles.textSecondary}`}>
                      {formatDate(startDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1">
                  <Text className={`text-base font-medium mb-2 ${styles.textPrimary}`}>End Date</Text>
                  <TouchableOpacity
                    onPress={() => setShowEndDate(true)}
                    className={`flex-row items-center ${styles.inputBg} rounded-xl px-4 py-3`}
                  >
                    <Ionicons name="calendar-outline" size={20} color={styles.iconColorMuted} />
                    <Text className={`ml-3 ${styles.textSecondary}`}>
                      {formatDate(endDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Trip Type */}
              <View>
                <Text className={`text-base font-medium mb-2 ${styles.textPrimary}`}>Trip Type</Text>
                <View className="flex-row flex-wrap gap-3">
                  {tripTypes.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      onPress={() => setSelectedType(type.name)}
                      className={`px-4 py-3 rounded-xl border ${
                        selectedType === type.name
                          ? styles.buttonPrimary
                          : `${styles.bgSecondary} ${styles.borderColor}`
                      }`}
                    >
                      <View className="items-center">
                        <Ionicons
                          name={getIconName(type)}
                          size={24}
                          color={selectedType === type.name ? styles.buttonPrimaryText : styles.iconColor}
                        />
                        <Text
                          className={`mt-1 text-sm ${
                            selectedType === type.name
                              ? styles.buttonPrimaryText
                              : styles.textPrimary
                          }`}
                        >
                          {type.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Budget */}
              <View>
                <Text className={`text-base font-medium mb-2 ${styles.textPrimary}`}>Budget</Text>
                <View className={`flex-row items-center ${styles.inputBg} rounded-xl px-4 py-3`}>
                  <Ionicons name="wallet-outline" size={20} color={styles.iconColorMuted} />
                  <TextInput
                    placeholder="Enter your budget"
                    keyboardType="numeric"
                    className={`flex-1 ml-3 ${styles.inputText}`}
                    placeholderTextColor={styles.iconColorMuted}
                  />
                  <Text className={styles.textSecondary}>USD</Text>
                </View>
              </View>

              {/* Notes */}
              <View>
                <Text className={`text-base font-medium mb-2 ${styles.textPrimary}`}>Notes</Text>
                <View className={`${styles.inputBg} rounded-xl px-4 py-3`}>
                  <TextInput
                    placeholder="Add any additional notes..."
                    multiline
                    numberOfLines={4}
                    className={`${styles.inputText}`}
                    placeholderTextColor={styles.iconColorMuted}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Create Button */}
              <TouchableOpacity
                className={`${styles.buttonPrimary} py-4 rounded-2xl mt-6`}
                onPress={handleCreateTrip}
                disabled={isSubmitting}
              >
                <View className="flex-row items-center justify-center">
                  {isSubmitting ? (
                    <View className="flex-row items-center">
                      <Text className={`${styles.buttonPrimaryText} text-center font-semibold text-lg mr-2`}>
                        Creating Trip
                      </Text>
                      <ActivityIndicator color={styles.buttonPrimaryText} />
                    </View>
                  ) : (
                    <Text className={`${styles.buttonPrimaryText} text-center font-semibold text-lg`}>
                      Create Trip
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
