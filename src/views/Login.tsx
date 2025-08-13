import { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useToast } from '../context/ToastContext';
import { globalStyles } from '../styles';
import { NavigationProp } from '../types';

// Apollo
import { ApolloError, gql, useMutation } from '@apollo/client';

const AUTH_USER = gql`
  mutation authenticateUser($input: AuthInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

export default function Login() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Toast
  const { showToast } = useToast();

  // Redirect
  const navigation = useNavigation<NavigationProp>();

  // Apollo's mutation
  const [authenticateUser] = useMutation(AUTH_USER);

  // After fill out form
  const handleSubmit = async () => {
    // Validate
    if (!email || !password) {
      showToast('All fields are required');
      return;
    }

    try {
      // Auth user
      const { data } = await authenticateUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const { token } = data.authenticateUser;

      // Set token on Storage
      await AsyncStorage.setItem('token', token);

      // Send user to Projects
      navigation.navigate('Projects');
    } catch (error) {
      if (error instanceof ApolloError && error.graphQLErrors.length > 0) {
        showToast(error.graphQLErrors[0].message);
      } else if (error instanceof Error) {
        showToast(error.message);
      } else {
        showToast('Something went wrong');
      }
    }
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: '#E84347' }]}>
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>UpTask</Text>

        <View>
          <TextInput
            placeholder="Email"
            style={globalStyles.input}
            activeUnderlineColor="transparent"
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            placeholder="Password"
            style={globalStyles.input}
            activeUnderlineColor="transparent"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <Button style={globalStyles.btn} onPress={() => handleSubmit()}>
          <Text style={globalStyles.btnText}>Login</Text>
        </Button>

        <Text
          onPress={() => navigation.navigate('Register')}
          style={globalStyles.link}
        >
          Create account
        </Text>
      </View>
    </View>
  );
}
