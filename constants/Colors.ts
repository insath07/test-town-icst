/**
 * 🎨 Centralized color palette for the app.
 * Supports both Light & Dark themes.
 */

const tintColorLight = '#ff6347'; // 🔥 Tomato red for active items
const tintColorDark = '#ff8c00';  // 🟠 Orange for dark mode highlight

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    card: '#F5F5F5',
    border: '#E2E2E2',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#A0A0A0',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#1F2127', // 👌 dark gray (burger app theme)
    card: '#2C2F36',
    border: '#333',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,
  },
};
