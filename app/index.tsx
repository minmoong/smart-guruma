import React from 'react';
import { View } from 'react-native';
import Toast, {
  ErrorToast,
  SuccessToast,
  ToastConfig,
} from 'react-native-toast-message';
import Map from '@/components/Map';

const toastConfig: ToastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{ fontSize: 18 }}
      text2Style={{ fontSize: 15 }}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{ fontSize: 18 }}
      text2Style={{ fontSize: 15 }}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  ),
};

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Map />
      <Toast config={toastConfig} position="bottom" visibilityTime={5000} />
    </View>
  );
}
