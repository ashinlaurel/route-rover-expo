import { Image, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center bg-white items-center p-4">
      <View className="items-center">
        <Image
          source={{ uri: 'https://img.freepik.com/free-vector/hotel-booking-concept-illustration_114360-6497.jpg' }}
          className="w-72 h-72"
        />
        <Text className="text-6xl font-medium text-gray-800 mt-4">Route-Rover</Text>

        <TouchableOpacity className="bg-black mt-4 px-6 py-2 rounded-full">
          <Text className="text-white text-lg">Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-2" onPress={() => router.push('/login')}>
          <Text className="text-pink-500 text-lg">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
