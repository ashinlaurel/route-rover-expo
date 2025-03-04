import { Platform, View } from "react-native";
import { PlatformPressable, Text } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 35,
        left: 70,
        right: 70,
        backgroundColor: "black",
        borderRadius: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        // Android shadow
        elevation: 5,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            pressColor="transparent"
            pressOpacity={0}
          >
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isFocused ? "#FFFFFF" : "transparent",
                transform: [{ scale: isFocused ? 1 : 0.95 }],
              }}
            >
              <Ionicons
                name={
                  route.name === "mainfeed"
                    ? "albums-outline"
                    : route.name === "createtrip"
                    ? "add"
                    : "person-outline"
                }
                size={route.name === "createtrip" ? 28 : 24}
                color={isFocused ? "#000000" : "#FFFFFF"}
                style={{
                  opacity: isFocused ? 1 : 0.8,
                }}
              />
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
