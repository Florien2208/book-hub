// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;


const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "book.fill": "menu-book", // Book Catalog
  "bookmark.fill": "bookmark", // My Books
  "person.fill": "person",
  "checkmark.circle.fill": "check-circle",
  "chart.bar.fill": "bar-chart",
  "exclamationmark.triangle.fill": "warning",
  magnifyingglass: "search",
  "arrow.clockwise": "autorenew",
  "xmark.circle.fill": "cancel",
  "person.circle": "account-circle",
  xmark: "close",
  book: "menu-book",
  "exclamationmark.triangle": "warning",
  clock: "schedule",
  "heart.fill": "favorite",
  target: "track-changes",
  "questionmark.circle": "help",
  "info.circle": "info",
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
