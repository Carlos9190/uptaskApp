import { StyleSheet, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { useToast } from '../context/ToastContext';
import { Task } from '../types';

// Apollo
import { ApolloError, gql, useMutation } from '@apollo/client';

const UPDATE_TASK = gql`
  mutation updateTask($id: ID!, $input: TaskInput, $status: Boolean) {
    updateTask(id: $id, input: $input, status: $status) {
      id
      name
      status
      project
    }
  }
`;

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  // Project id
  const { id } = task;

  // Toast
  const { showToast } = useToast();

  // Apollo's mutation
  const [updateTask] = useMutation(UPDATE_TASK);

  const changeStatus = async () => {
    try {
      const { data } = await updateTask({
        variables: {
          id,
          input: {
            name: task.name,
            project: task.project,
          },
          status: !task.status,
        },
      });
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
    <>
      <List.Item
        title={task.name}
        right={() => {
          return task.status ? (
            <IconButton icon="check-circle" size={32} iconColor="green" />
          ) : (
            <IconButton icon="check-circle" size={32} iconColor="#E1E1E1" />
          );
        }}
        onPress={() => changeStatus()}
      />
      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
});
