import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { useAuth } from '@/context/AuthContext';
import { Mail, Phone, CalendarClock, User, MapPin } from 'lucide-react-native';

const initialData = {
  id: 'F001',
  name: 'Jane Faculty',
  email: 'faculty@university.edu',
  facultyId: 'FAC2023001',
  phone: '+1 (555) 987-6543',
  dob: '1985-03-20',
  gender: 'Female',
  address: '456 Faculty Lane, Campus City',
  department: 'Electronics and Communication',
  experience: '10 years',
  designation: 'Associate Professor',
  aadhaarNumber: '1234-5678-9012',
  bloodGroup: 'B+',
  nationality: 'Indian',
  profilePicture: null, // or some default image uri
};

const initialWorkExperience = [
  {
    id: '1',
    organization: 'Tech Solutions Inc.',
    startYear: '2015',
    endYear: '2019',
    description: 'Worked as Senior Engineer focusing on embedded systems.',
  },
  {
    id: '2',
    organization: 'University Research Lab',
    startYear: '2019',
    endYear: 'Present',
    description: 'Associate Professor and Researcher in Electronics.',
  },
];

export default function FacultyProfileScreen() {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [profile, setProfile] = useState({
    ...initialData,
    name: user?.name || initialData.name,
    email: user?.email || initialData.email,
    profilePicture: user?.profilePicture || null,
  });
  const [workExperience, setWorkExperience] = useState(initialWorkExperience);

  // Pick profile image
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
    if (!result.canceled) setProfile({ ...profile, profilePicture: result.assets[0].uri });
  };

  // Update profile field
  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Update work experience field
  const handleWorkExpChange = (index: number, field: keyof typeof workExperience[0], value: string) => {
    const updated = [...workExperience];
    updated[index][field] = value;
    setWorkExperience(updated);
  };

  // Add new work experience entry
  const addWorkExperience = () => {
    setWorkExperience(prev => [
      ...prev,
      { id: (prev.length + 1).toString(), organization: '', startYear: '', endYear: '', description: '' },
    ]);
  };

  // Remove work experience entry
  const removeWorkExperience = (index: number) => {
    Alert.alert(
      'Remove Work Experience',
      'Are you sure you want to remove this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updated = [...workExperience];
            updated.splice(index, 1);
            setWorkExperience(updated);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        name={profile.name}
        role="Faculty"
        profileImage={profile.profilePicture}
        canEdit={true}
        onEditPress={() => setShowEdit(p => !p)}
      />

      <TouchableOpacity style={styles.actionButton} onPress={() => setShowEdit(p => !p)}>
        <Text style={styles.actionButtonText}>{showEdit ? 'Close Edit' : 'Edit Profile'}</Text>
      </TouchableOpacity>

      {showEdit ? (
        <View style={styles.editSection}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Image
              source={
                profile.profilePicture
                  ? { uri: profile.profilePicture }
                  : require('@/assets/images/default-avatar.png')
              }
              style={styles.image}
            />
            <Text style={styles.imageText}>Tap to change photo</Text>
          </TouchableOpacity>

          {[
            { label: 'Name', field: 'name' },
            { label: 'Faculty ID', field: 'facultyId' },
            { label: 'Email', field: 'email' },
            { label: 'Department', field: 'department' },
            { label: 'Experience', field: 'experience' },
            { label: 'Designation', field: 'designation' },
            { label: 'Mobile Number', field: 'phone' },
            { label: 'Date of Birth', field: 'dob' },
            { label: 'Address', field: 'address' },
            { label: 'Aadhaar Number', field: 'aadhaarNumber' },
            { label: 'Gender', field: 'gender' },
            { label: 'Blood Group', field: 'bloodGroup' },
            { label: 'Nationality', field: 'nationality' },
          ].map(({ label, field }) => (
            <View key={field} style={{ marginBottom: 12 }}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                value={profile[field]}
                onChangeText={text => handleChange(field as keyof typeof profile, text)}
              />
            </View>
          ))}

          <View style={{ marginTop: 20 }}>
            <Text style={[styles.sectionTitle, { marginBottom: SPACING.md }]}>Work Experience</Text>
            {workExperience.map((exp, idx) => (
              <View key={exp.id} style={[styles.infoCard, { marginBottom: SPACING.md }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.label}>Organization</Text>
                  <TouchableOpacity onPress={() => removeWorkExperience(idx)}>
                    <Text style={{ color: COLORS.red, fontWeight: 'bold' }}>Remove</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Organization Name"
                  value={exp.organization}
                  onChangeText={text => handleWorkExpChange(idx, 'organization', text)}
                />

                <Text style={styles.label}>Start Year</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 2015"
                  keyboardType="numeric"
                  value={exp.startYear}
                  onChangeText={text => handleWorkExpChange(idx, 'startYear', text)}
                />

                <Text style={styles.label}>End Year</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 2019 or Present"
                  value={exp.endYear}
                  onChangeText={text => handleWorkExpChange(idx, 'endYear', text)}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, { height: 60 }]}
                  placeholder="Brief description"
                  multiline
                  value={exp.description}
                  onChangeText={text => handleWorkExpChange(idx, 'description', text)}
                />
              </View>
            ))}

            <TouchableOpacity style={[styles.actionButton, { marginTop: 0 }]} onPress={addWorkExperience}>
              <Text style={styles.actionButtonText}>Add Work Experience</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Basic Details</Text>
            <View style={styles.infoCard}>
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Name" value={profile.name} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Faculty ID" value={profile.facultyId} />
              <InfoRow icon={<Mail size={16} color={COLORS.gray} />} label="Email" value={profile.email} />
              <InfoRow icon={<MapPin size={16} color={COLORS.gray} />} label="Department" value={profile.department} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Experience" value={profile.experience} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Designation" value={profile.designation} />
              <InfoRow icon={<Phone size={16} color={COLORS.gray} />} label="Mobile Number" value={profile.phone} />
              <InfoRow icon={<CalendarClock size={16} color={COLORS.gray} />} label="Date of Birth" value={new Date(profile.dob).toLocaleDateString()} />
              <InfoRow icon={<MapPin size={16} color={COLORS.gray} />} label="Address" value={profile.address} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Aadhaar Number" value={profile.aadhaarNumber} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Gender" value={profile.gender} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Blood Group" value={profile.bloodGroup} />
              <InfoRow icon={<User size={16} color={COLORS.gray} />} label="Nationality" value={profile.nationality} />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workExperience.length === 0 ? (
              <Text style={{ fontStyle: 'italic', color: COLORS.gray, padding: SPACING.md }}>No work experience provided.</Text>
            ) : (
              workExperience.map(exp => (
                <View key={exp.id} style={styles.infoCard}>
                  <Text style={[styles.infoLabel, { fontWeight: '600' }]}>{exp.organization}</Text>
                  <Text style={styles.infoValue}>
                    {exp.startYear} - {exp.endYear}
                  </Text>
                  <Text style={styles.infoValue}>{exp.description}</Text>
                </View>
              ))
            )}
          </View>
        </>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoLabelContainer}>
      {icon}
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.sm,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  actionButtonText: {
    color: COLORS.white,
    fontFamily: FONT.semiBold,
  },
  editSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    marginTop: 8,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  label: {
    fontFamily: FONT.medium,
    color: COLORS.gray,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    padding: 10,
    borderRadius: 8,
  },
  sectionContainer: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginLeft: 6,
  },
  infoValue: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
  },
  red: {
    color: COLORS.red,
  },
});
