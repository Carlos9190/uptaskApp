import { StyleSheet, View } from 'react-native';
import { Button, Text, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles';
import { GetProjectsData, NavigationProp } from '../types';

// Apollo
import { ApolloError, gql, useQuery } from '@apollo/client';
import Spinner from '../components/Spinner';

const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      name
      id
    }
  }
`;

export default function Projects() {
  // Redirect
  const navigation = useNavigation<NavigationProp>();

  // Apollo's query
  const { data, loading, error } = useQuery<GetProjectsData>(GET_PROJECTS);

  if (loading) return <Spinner />;

  if (data)
    return (
      <View style={[globalStyles.container, { backgroundColor: '#E84347' }]}>
        <Button
          style={[
            globalStyles.btn,
            { marginTop: 30, marginHorizontal: '2.5%' },
          ]}
          onPress={() => navigation.navigate('NewProject')}
        >
          <Text style={globalStyles.btnText}>New project</Text>
        </Button>

        <Text style={[globalStyles.subtitle, { marginTop: 20 }]}>
          Select a project
        </Text>

        <View style={styles.content}>
          {data.getProjects.map(project => (
            <List.Item
              key={project.id}
              title={project.name}
              onPress={() => navigation.navigate('ProjectDetails', project)}
            />
          ))}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFF',
    marginHorizontal: '2.5%',
  },
});
