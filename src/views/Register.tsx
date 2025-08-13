import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { globalStyles } from '../styles';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function Register() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  // After fill out form
  const hanldeSubmit = () => {
    // Validate
    if (!name || !email || !password) {
      setMessage('All fields are required');
      setVisible(true);
      return;
    }

    // Password length
    if (password.length) {
      setMessage('Password must be at least 6 characters');
      setVisible(true);
      return;
    }

    // Save user
  };

  return (
    <View style={[globalStyles.container, { backgroundColor: '#E84347' }]}>
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>UpTask</Text>

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

        <Button style={globalStyles.btn} onPress={() => hanldeSubmit()}>
          <Text style={globalStyles.btnText}>Register</Text>
        </Button>
      </View>

      <Toast visible={visible} setVisible={setVisible} message={message} />
    </View>
  );
}
