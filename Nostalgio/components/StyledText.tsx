import { Text, TextProps } from './Themed';

import { Unbounded_400Regular, Unbounded_600SemiBold, useFonts } from '@expo-google-fonts/unbounded';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Unbounded_400Regular' }]} />;


}
