import { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { useToast } from '../context/ToastContext';
import TaskCard from '../components/TaskCard';
import Spinner from '../components/Spinner';
import { GetTasksData, RootStackParamList } from '../types';
import { globalStyles } from '../styles';

// Apollo
import { ApolloError, gql, useMutation, useQuery } from '@apollo/client';

const NEW_TASK = gql`
  mutation createTask($input: TaskInput) {
    createTask(input: $input) {
      id
      name
      status
      project
    }
  }
`;

// Get project's tasks
const GET_TASKS = gql`
  query getTasks($input: ProjectIDInput) {
    getTasks(input: $input) {
      id
      name
      status
      project
    }
  }
`;

type ProjectDetailsProps = StackScreenProps<
  RootStackParamList,
  'ProjectDetails'
>;

export default function ProjectDetails({ route }: ProjectDetailsProps) {
  // Form state
  const [name, setName] = useState('');

  // Project id
  const { id } = route.params;

  // Toast
  const { showToast } = useToast();

  // Apollo's query
  const { data, loading } = useQuery<GetTasksData>(GET_TASKS, {
    variables: {
      input: {
        project: id,
      },
    },
  });

  // Apollo's mutation
  const [createTask] = useMutation(NEW_TASK);

  const handleSubmit = async () => {
    // Validate
    if (!name) {
      showToast('Task name is required');
      return;
    }

    try {
      const { data } = await createTask({
        variables: {
          input: {
            name,
            project: id,
          },
        },
      });

      setName('');
      showToast('Task successfully created');
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

  if (loading) return <Spinner />;

  return (
    <View style={[globalStyles.container, { backgroundColor: '#E84347' }]}>
      <View style={{ marginHorizontal: '2.5%', marginTop: 20 }}>
        <View>
          <TextInput
            placeholder="Task name"
            style={globalStyles.input}
            activeUnderlineColor="transparent"
            onChangeText={text => setName(text)}
            value={name}
          />

          <Button style={globalStyles.btn} onPress={() => handleSubmit()}>
            <Text style={globalStyles.btnText}>Create task</Text>
          </Button>
        </View>

        <Text style={globalStyles.subtitle}>Task: {route.params.name}</Text>

        <View style={{ backgroundColor: '#FFF' }}>
          {data?.getTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>
      </View>
    </View>
  );
}
