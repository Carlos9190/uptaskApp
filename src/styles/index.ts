import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '2.5%',
  },
  title: {
    fontSize: 32,
    color: '#FFF',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  btn: {
    padding: 7,
    borderRadius: 10,
    backgroundColor: '#28303B',
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  link: {
    fontSize: 18,
    marginTop: 60,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    padding: 25,
    backgroundColor: 'white',
  },
});
