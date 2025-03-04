import { Ionicons } from "@expo/vector-icons";
import { TabBar } from "@/components/TabBar";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen options={{headerShown: false, animation:'shift'}} name="mainfeed" />
      <Tabs.Screen options={{headerShown: false, animation:'shift'}} name="createtrip" />
      <Tabs.Screen options={{headerShown: false, animation:'shift'}} name="personal" />
    </Tabs>
  );
}
