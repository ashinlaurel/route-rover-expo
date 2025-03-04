import { Platform, View } from 'react-native';
import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{
      position: 'absolute',
      bottom: 25,
      left: 70,
      right: 70,
      backgroundColor: 'white',
      borderRadius: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      // iOS shadow
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      // Android shadow
      elevation: 5,
    }}>
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
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
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
            style={{ flex: 1 }}
            className='p-4 flex  items-center justify-center '
            pressColor='transparent'
            pressOpacity={0}
          >
            <Ionicons
              name={
                route.name === 'mainfeed'
                  ? 'albums-outline'
                  : route.name === 'createtrip'
                    ? 'add'
                    : 'person-outline'
              }
              size={route.name=='createtrip'? 28:24}
              color={isFocused ? colors.primary : colors.text}
            />
          </PlatformPressable>
        );
      })}
    </View>
  );
}
