import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { openSettings } from 'react-native-permissions';

const CameraScanner = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null); // null = loading state

  useEffect(() => {
    requestCameraPermission();
  }, []);

const requestCameraPermission = async () => {
  const result = await check(PERMISSIONS.IOS.CAMERA);
  if (result === RESULTS.GRANTED) {
    setCameraPermission(true);
  } else if (result === RESULTS.BLOCKED) {
    Alert.alert(
      'Permission Denied',
      'Camera access is blocked. Please allow access in Settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() }
      ]
    );
    setCameraPermission(false);
  } else {
    const requestResult = await request(PERMISSIONS.IOS.CAMERA);
    if (requestResult === RESULTS.GRANTED) {
      setCameraPermission(true);
    } else {
      setCameraPermission(false);
      Alert.alert('Permission Denied', 'Camera access is required to scan QR codes.');
    }
  }
};


  if (cameraPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9800" />
        <Text style={styles.loadingText}>Checking Camera Permissions...</Text>
      </View>
    );
  }

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera permission is required to use this feature.</Text>
      </View>
    );
  }

  return (
    <QRCodeScanner
      onRead={(e) => Alert.alert('QR Code Scanned', e.data)}
      showMarker={true}
      flashMode={RNCamera.Constants.FlashMode.auto}
      containerStyle={styles.scanner}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scanner: {
    flex: 1,
  },
});

export default CameraScanner;
