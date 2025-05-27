import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { COLORS, FONT, SPACING } from '@/constants/theme';

export default function EditProfileScreen() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    image: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    rollNumber: '',
    dob: '',
    gender: '',
    department: '',
    batch: '',
    fathersName: '',
    mothersName: '',
    firstGraduate: '',
    github: '',
    linkedin: '',
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'Camera roll permission is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setProfile({ ...profile, image: result.assets[0].uri });
    }
  };

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image
          source={profile.image ? { uri: profile.image } : require('@/assets/images/default-avatar.png')}
          style={styles.image}
        />
        <Text style={styles.imageText}>Tap to change photo</Text>
      </TouchableOpacity>

      {[
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Address', key: 'address' },
        { label: 'Roll Number', key: 'rollNumber' },
        { label: 'Date of Birth (YYYY-MM-DD)', key: 'dob' },
        { label: 'Gender', key: 'gender' },
        { label: 'Department', key: 'department' },
        { label: 'Batch', key: 'batch' },
        { label: "Father's Name", key: 'fathersName' },
        { label: "Mother's Name", key: 'mothersName' },
        { label: 'First Graduate (Yes/No)', key: 'firstGraduate' },
        { label: 'GitHub Username', key: 'github' },
        { label: 'LinkedIn Username', key: 'linkedin' },
      ].map(({ label, key }) => (
        <View key={key}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={profile[key]}
            onChangeText={(text) => handleChange(key, text)}
          />
        </View>
      ))}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          // You can integrate save logic here (API call)
          Alert.alert('Saved', 'Student profile updated!');
          router.back(); // Navigate back after saving
        }}
      >
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageText: {
    marginTop: 6,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  label: {
    marginTop: 10,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontFamily: FONT.semiBold,
  },
});
