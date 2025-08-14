import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { useToast } from '../context/ToastContext';
import { GetTasksData, Task } from '../types';

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

const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id)
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

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  // Project id
  const { id, project } = task;

  // Toast
  const { showToast } = useToast();

  // Apollo's mutations
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data }) {
      if (!data) return;

      const existing = cache.readQuery<GetTasksData>({
        query: GET_TASKS,
        variables: {
          input: {
            project,
          },
        },
      });

      if (!existing) return;

      const { getTasks } = existing;

      cache.writeQuery<GetTasksData>({
        query: GET_TASKS,
        variables: {
          input: {
            project,
          },
        },
        data: {
          getTasks: getTasks.filter(currentTask => currentTask.id !== task.id),
        },
      });
    },
  });

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

  // Dialog to delete or not a task
  const showDelete = () => {
    Alert.alert('Delete task', 'Do you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteTaskDB(),
      },
    ]);
  };

  const deleteTaskDB = async () => {
    const { id } = task;

    try {
      const { data } = await deleteTask({
        variables: {
          id,
        },
      });

      showToast('Task successfully deleted');
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
    <Pressable onPress={changeStatus} onLongPress={showDelete}>
      <List.Item
        title={task.name}
        right={() => {
          return task.status ? (
            <IconButton icon="check-circle" size={32} iconColor="green" />
          ) : (
            <IconButton icon="check-circle" size={32} iconColor="#E1E1E1" />
          );
        }}
      />
      <View style={styles.separator} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
});
