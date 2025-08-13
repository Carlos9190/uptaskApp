import 'react-native-gesture-handler';

// Views
import Login from './src/views/Login';
import Register from './src/views/Register';
import Projects from './src/views/Projects';
import NewProject from './src/views/NewProject';
import ProjectDetails from './src/views/ProjectDetails';

import { ToastProvider } from './src/context/ToastContext';

// Theme
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#28303B',
  },
};

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types';
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerTitleAlign: 'center',
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Login',
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: 'Create account',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />

            <Stack.Screen
              name="Projects"
              component={Projects}
              options={{
                title: 'Projects',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />

            <Stack.Screen
              name="NewProject"
              component={NewProject}
              options={{
                title: 'New project',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />

            <Stack.Screen
              name="ProjectDetails"
              component={ProjectDetails}
              options={({ route }) => ({
                title: route.params.name,
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </PaperProvider>
  );
}
