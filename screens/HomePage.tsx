import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import { Button, Card, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Define the stack type
type RootStackParamList = {
  HomePage: undefined;
  CameraScanner: undefined;
  GalleryScanner: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

export default function HomePage() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleCameraNavigation = async () => {
    const permission = await check(PERMISSIONS.IOS.CAMERA);
    if (permission === RESULTS.GRANTED) {
      navigation.navigate('CameraScanner');
    } else {
      const requestPermission = await request(PERMISSIONS.IOS.CAMERA);
      if (requestPermission === RESULTS.GRANTED) {
        navigation.navigate('CameraScanner');
      } else {
        Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
      }
    }
  };

  const handleGalleryNavigation = () => {
    navigation.navigate('GalleryScanner');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF9800" barStyle="light-content" />

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Welcome to QR Code Scanner!</Text>
          <Text style={styles.subtitle}>Choose an option to get started</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="camera"
          style={styles.button}
          onPress={handleCameraNavigation}
        >
          Scan with Camera
        </Button>

        <Button
          mode="contained"
          icon="image"
          style={styles.button}
          onPress={handleGalleryNavigation}
        >
          Scan from Gallery
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1000}
      >
        Navigating...
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 30,
    borderRadius: 10,
    elevation: 3,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF9800',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#757575',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#FF9800',
  },
});
