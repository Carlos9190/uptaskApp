import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../context/ToastContext';
import { GetProjectsData, NavigationProp } from '../types';
import { globalStyles } from '../styles';

// Apollo
import { ApolloError, gql, useMutation } from '@apollo/client';

const NEW_PROJECT = gql`
  mutation createProject($input: ProjectInput) {
    createProject(input: $input) {
      name
      id
    }
  }
`;

// Update cache
const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      name
      id
    }
  }
`;

export default function NewProject() {
  // Form state
  const [name, setName] = useState('');

  // Toast
  const { showToast } = useToast();

  // Redirect
  const navigation = useNavigation<NavigationProp>();

  // Apollo's mutation
  const [createProject] = useMutation(NEW_PROJECT, {
    update(cache, { data }) {
      if (!data) return;

      const existing = cache.readQuery<GetProjectsData>({
        query: GET_PROJECTS,
      });

      if (!existing) return;

      const { getProjects } = existing;

      cache.writeQuery<GetProjectsData>({
        query: GET_PROJECTS,
        data: { getProjects: [...getProjects, data.createProject] },
      });
    },
  });

  const handleSubmit = async () => {
    // Validate
    if (!name) {
      showToast('Project name is required');
      return;
    }

    // Save project
    try {
      const { data } = await createProject({
        variables: {
          input: {
            name,
          },
        },
      });

      showToast('Project successfully created');
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
        <Text style={globalStyles.title}>New project</Text>

        <View>
          <TextInput
            placeholder="Project name"
            style={globalStyles.input}
            activeUnderlineColor="transparent"
            onChangeText={text => setName(text)}
          />
        </View>

        <Button style={globalStyles.btn} onPress={() => handleSubmit()}>
          <Text style={globalStyles.btnText}>Create project</Text>
        </Button>
      </View>
    </View>
  );
}
