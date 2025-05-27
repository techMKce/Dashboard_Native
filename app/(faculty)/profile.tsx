import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { useAuth } from '@/context/AuthContext';
import { Mail, Phone, BookOpen, GraduationCap, MapPin, Award, Calendar, ChevronRight } from 'lucide-react-native';

// Mock faculty data
const mockFacultyData = {
  id: '1',
  name: 'Dr. John Faculty',
  email: 'faculty@university.edu',
  phone: '+1 (555) 123-4567',
  department: 'Computer Science',
  designation: 'Associate Professor',
  specialization: 'Artificial Intelligence',
  experience: '10 years',
  education: [
    {
      degree: 'Ph.D. in Computer Science',
      institution: 'Stanford University',
      year: '2015',
    },
    {
      degree: 'M.S. in Computer Science',
      institution: 'MIT',
      year: '2010',
    },
  ],
  courses: [
    'Advanced Database Systems',
    'Machine Learning',
    'Neural Networks',
  ],
  office: 'Room 401, Computer Science Building',
  officeHours: 'Mon-Wed 2:00 PM - 4:00 PM',
};

export default function FacultyProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <ProfileHeader 
        name={user?.name || mockFacultyData.name}
        role="Faculty"
        profileImage={user?.profilePicture}
        canEdit={true}
      />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Mail size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{mockFacultyData.email}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Phone size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{mockFacultyData.phone}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MapPin size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Office</Text>
                <Text style={styles.infoValue}>{mockFacultyData.office}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Calendar size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Office Hours</Text>
                <Text style={styles.infoValue}>{mockFacultyData.officeHours}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <GraduationCap size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Department</Text>
                <Text style={styles.infoValue}>{mockFacultyData.department}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Award size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Designation</Text>
                <Text style={styles.infoValue}>{mockFacultyData.designation}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <BookOpen size={20} color={COLORS.gray} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Specialization</Text>
                <Text style={styles.infoValue}>{mockFacultyData.specialization}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.card}>
            {mockFacultyData.education.map((edu, index) => (
              <View key={index} style={[styles.infoRow, index === mockFacultyData.education.length - 1 && styles.lastRow]}>
                <View style={styles.infoIcon}>
                  <GraduationCap size={20} color={COLORS.gray} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoValue}>{edu.degree}</Text>
                  <Text style={styles.infoSubtext}>{edu.institution}, {edu.year}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Courses</Text>
          <View style={styles.card}>
            {mockFacultyData.courses.map((course, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.courseRow, index === mockFacultyData.courses.length - 1 && styles.lastRow]}
              >
                <View style={styles.courseInfo}>
                  <BookOpen size={20} color={COLORS.gray} />
                  <Text style={styles.courseName}>{course}</Text>
                </View>
                <ChevronRight size={20} color={COLORS.gray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  infoIcon: {
    width: 40,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  infoSubtext: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 2,
  },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  courseName: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
});