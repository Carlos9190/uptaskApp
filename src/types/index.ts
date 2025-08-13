import { StackNavigationProp } from '@react-navigation/stack';

// Views
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Navigation
export type NavigationProp = StackNavigationProp<RootStackParamList>;
