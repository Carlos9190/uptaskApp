import { View, ActivityIndicator } from 'react-native';

export default function Spinner() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#28303B" />
    </View>
  );
}
