import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types';
import { globalStyles } from '../styles';

export default function Login() {
  // Redirect
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={[globalStyles.container, { backgroundColor: '#E84347' }]}>
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>UpTask</Text>

        <View>
          <TextInput
            placeholder="Email"
            style={globalStyles.input}
            activeUnderlineColor="transparent"
          />

          <TextInput
            placeholder="Password"
            style={globalStyles.input}
            activeUnderlineColor="transparent"
            secureTextEntry={true}
          />
        </View>

        <Button style={globalStyles.btn}>
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
