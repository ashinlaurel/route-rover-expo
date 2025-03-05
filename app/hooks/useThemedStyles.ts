import { useTheme } from "../context/ThemeContext";

export function useThemedStyles() {
  const { isDarkMode } = useTheme();

  return {
    // Background colors
    bgPrimary: isDarkMode ? "bg-gray-900" : "bg-white",
    bgSecondary: isDarkMode ? "bg-gray-800" : "bg-gray-50",
    bgTertiary: isDarkMode ? "bg-gray-700" : "bg-gray-100",

    // Text colors
    textPrimary: isDarkMode ? "text-white" : "text-gray-800",
    textSecondary: isDarkMode ? "text-gray-400" : "text-gray-500",
    textTertiary: isDarkMode ? "text-gray-500" : "text-gray-400",

    // Border colors
    borderColor: isDarkMode ? "border-gray-800" : "border-gray-100",

    // Icon colors
    iconColor: isDarkMode ? "white" : "black",
    iconColorMuted: isDarkMode ? "#9CA3AF" : "#6B7280",

    // Button colors
    buttonPrimary: isDarkMode ? "bg-white" : "bg-black",
    buttonPrimaryText: isDarkMode ? "text-black" : "text-white",
    buttonSecondary: isDarkMode ? "bg-gray-800" : "bg-gray-100",
    buttonSecondaryText: isDarkMode ? "text-white" : "text-black",

    // Card styles
    cardBg: isDarkMode ? "bg-gray-800" : "bg-white",
    cardBorder: isDarkMode ? "border-gray-700" : "border-gray-200",
    cardShadow: isDarkMode ? "shadow-none" : "shadow-md",

    // Input styles
    inputBg: isDarkMode ? "bg-gray-800" : "bg-gray-50",
    inputText: isDarkMode ? "text-white" : "text-gray-800",
    inputPlaceholder: isDarkMode ? "text-gray-400" : "text-gray-500",

    // Status bar style
    statusBarStyle: isDarkMode ? "light-content" : "dark-content",

    // Overlay colors
    overlayBg: isDarkMode ? "bg-black/50" : "bg-black/30",
  };
}
