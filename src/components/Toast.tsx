import { Snackbar } from 'react-native-paper';

type ToastProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};

export default function Toast({ visible, setVisible, message }: ToastProps) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      duration={5000}
      action={{
        label: 'Close',
        onPress: () => {
          setVisible(false);
        },
      }}
      style={{ position: 'absolute', bottom: 20 }}
    >
      {message}
    </Snackbar>
  );
}
