import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Button, Card, Text, Snackbar } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import jsQR from 'jsqr';
import RNFS from 'react-native-fs'; // File system utility
import { Buffer } from 'buffer'; // Import Buffer

export default function GalleryScanner() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, async (response) => {
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        const width = response.assets[0].width;
        const height = response.assets[0].height;

        if (!uri || !width || !height) {
          setQrCodeData('Invalid image selection');
          setSnackbarVisible(true);
          return;
        }

        setSelectedImage(uri);

        try {
          const filePath = uri.replace('file://', ''); // Remove the file:// prefix for RNFS
          const base64Image = await RNFS.readFile(filePath, 'base64'); // Read the file as base64
          const binaryData = Uint8Array.from(Buffer.from(base64Image, 'base64')); // Convert to Uint8Array

          detectQRCode(binaryData, width, height);
        } catch (error) {
          setQrCodeData('Failed to process image');
          setSnackbarVisible(true);
          console.error(error);
        }
      }
    });
  };

  const detectQRCode = (imageData: Uint8Array, width: number, height: number) => {
    const qrCode = jsQR(new Uint8ClampedArray(imageData), width, height);
    if (qrCode) {
      setQrCodeData(qrCode.data);
    } else {
      setQrCodeData('No QR code found');
    }
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Gallery Scanner" subtitle="Select an image to detect QR code" />
        <Card.Content>
          <Text style={styles.infoText}>Choose an image from your gallery to scan for QR codes.</Text>
        </Card.Content>
      </Card>

      <Button mode="contained" icon="image" style={styles.button} onPress={pickImage}>
        Pick an Image
      </Button>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {qrCodeData}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#FF9800',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
