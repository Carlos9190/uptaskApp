import { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../context/ToastContext';
import { globalStyles } from '../styles';
import { NavigationProp } from '../types';

// Apollo
import { ApolloError, gql, useMutation } from '@apollo/client';

const NEW_ACCOUNT = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input)
  }
`;

export default function Register() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Toast
  const { showToast } = useToast();

  // Redirect
  const navigation = useNavigation<NavigationProp>();

  // Apollo's mutation
  const [createUser] = useMutation(NEW_ACCOUNT);

  // After fill out form
  const handleSubmit = async () => {
    // Validate
    if (!name || !email || !password) {
      showToast('All fields are required');
      return;
    }

    // Password length
    if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      return;
    }

    // Save user
    try {
      const { data } = await createUser({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });

      showToast(data.createUser);
      navigation.navigate('Login');
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
        <Text style={globalStyles.title}>Create account</Text>

        <View>
          <TextInput
            placeholder="Name"
            style={globalStyles.input}
            activeUnderlineColor="transparent"
            onChangeText={text => setName(text)}
          />

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
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <Button style={globalStyles.btn} onPress={() => handleSubmit()}>
          <Text style={globalStyles.btnText}>Register</Text>
        </Button>
      </View>
    </View>
  );
}
