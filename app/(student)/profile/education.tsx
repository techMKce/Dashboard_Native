import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';

export default function EducationDetailsScreen() {
  const [education, setEducation] = useState({
    school: '',
    highSchool: '',
    ugCollege: '',
    ugDegree: '',
    ugCGPA: '',
  });

  const handleChange = (field: string, value: string) => {
    setEducation({ ...education, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>School Name</Text>
      <TextInput style={styles.input} value={education.school} onChangeText={text => handleChange('school', text)} />

      <Text style={styles.label}>High School Name</Text>
      <TextInput style={styles.input} value={education.highSchool} onChangeText={text => handleChange('highSchool', text)} />

      <Text style={styles.label}>UG College Name</Text>
      <TextInput style={styles.input} value={education.ugCollege} onChangeText={text => handleChange('ugCollege', text)} />

      <Text style={styles.label}>UG Degree</Text>
      <TextInput style={styles.input} value={education.ugDegree} onChangeText={text => handleChange('ugDegree', text)} />

      <Text style={styles.label}>UG CGPA</Text>
      <TextInput style={styles.input} value={education.ugCGPA} onChangeText={text => handleChange('ugCGPA', text)} keyboardType="numeric" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
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
});
