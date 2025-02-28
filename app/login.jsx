import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-3xl font-medium text-gray-800">Login</Text>

      <TextInput
        className="border border-gray-400 rounded-lg w-80 px-4 py-2 mt-4"
        placeholder="Email"
        keyboardType="email-address"
      />

      <TextInput
        className="border border-gray-400 rounded-lg w-80 px-4 py-2 mt-2"
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity className="bg-black mt-4 px-6 py-2 rounded-full">
        <Text className="text-white text-lg">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-2" onPress={() => router.push('/')}>
        <Text className="text-pink-500 text-lg">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
