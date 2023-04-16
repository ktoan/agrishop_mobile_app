import Toast from 'react-native-toast-message';

export function showSuccessToast(message) {
  Toast.show({
    type: 'success',
    text1: 'Nice processing...',
    text2: message,
  });
}

export function showErrorToast(message) {
  Toast.show({
    type: 'error',
    text1: 'Bad processing...',
    text2: message,
  });
}

export function showInfoToast(message) {
  Toast.show({
    type: 'info',
    text1: 'Information...',
    text2: message,
  });
}
