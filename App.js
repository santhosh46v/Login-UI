import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from './LoginScreen';

export default function App() {
  return <LoginScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});