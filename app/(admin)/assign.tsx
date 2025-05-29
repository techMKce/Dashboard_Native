import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Check } from 'lucide-react-native';
import Header from '@/components/shared/Header';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';

const mockDepartments = [{ id: 'IT', name: 'IT' }];

const mockFaculty = [
  { id: '54i', name: 'Dr. John Smith' },
  { id: '234', name: 'Hema' },
];

const mockCourses = [{ id: '1', name: 'Python' }];

const mockStudents = [
  { id: '1', name: 'deepthi', roll: '45', department: 'IT' },
  { id: '2', name: 'manju', roll: '35', department: 'CSE' },
];

export default function AssignStudentsScreen() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isAssigned, setIsAssigned] = useState(false);

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssign = () => {
    console.log('Assigned Students:', selectedStudents);
    console.log('Faculty ID:', selectedFaculty);
    console.log('Course ID:', selectedCourse);

    setIsAssigned(true);

    setTimeout(() => {
      setSelectedDepartment('');
      setSelectedFaculty('');
      setSelectedCourse('');
      setSelectedStudents([]);
      setIsAssigned(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header title="Assign Students" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Department + Faculty */}
          <View style={styles.filters}>
            <Text style={styles.selectedText}>Select Department & Faculty</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedDepartment}
                onValueChange={setSelectedDepartment}
                style={styles.picker}
              >
                <Picker.Item label="Select Department" value="" />
                {mockDepartments.map(dept => (
                  <Picker.Item key={dept.id} label={dept.name} value={dept.id} />
                ))}
              </Picker>
            </View>

            {selectedDepartment !== '' && (
              <View style={styles.pickerContainer}>
                {mockFaculty.map(faculty => (
                  <TouchableOpacity
                    key={faculty.id}
                    onPress={() => setSelectedFaculty(faculty.id)}
                    style={[
                      styles.studentCard,
                      selectedFaculty === faculty.id && styles.selectedCard,
                    ]}
                  >
                    <View style={styles.studentInfo}>
                      <Text style={styles.studentName}>{faculty.name}</Text>
                      <Text style={styles.departmentName}>
                        Faculty ID: {faculty.id}
                      </Text>
                    </View>
                    {selectedFaculty === faculty.id && (
                      <View style={styles.checkmark}>
                        <Check size={20} color={COLORS.white} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Course + Students */}
          <View style={styles.filters}>
            <Text style={styles.selectedText}>Select Course and Students</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCourse}
                onValueChange={setSelectedCourse}
                style={styles.picker}
              >
                <Picker.Item label="Select Course" value="" />
                {mockCourses.map(course => (
                  <Picker.Item key={course.id} label={course.name} value={course.id} />
                ))}
              </Picker>
            </View>

            {selectedCourse !== '' && (
              <View>
                {mockStudents.map(student => (
                  <TouchableOpacity
                    key={student.id}
                    style={[
                      styles.studentCard,
                      selectedStudents.includes(student.id) && styles.selectedCard,
                    ]}
                    onPress={() => toggleStudent(student.id)}
                  >
                    <View style={styles.studentInfo}>
                      <Text style={styles.studentName}>{student.name}</Text>
                      <Text style={styles.departmentName}>
                        Roll: {student.roll} | Dept: {student.department}
                      </Text>
                    </View>
                    {selectedStudents.includes(student.id) && (
                      <View style={styles.checkmark}>
                        <Check size={20} color={COLORS.white} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Summary */}
          <View style={styles.selectedCount}>
            <Text style={styles.selectedText}>Assignment Summary</Text>
            {isAssigned ? (
              <Text style={[styles.departmentName, { color: COLORS.success }]}>
                ✅ Assigned Successfully!
              </Text>
            ) : (
              <>
                <Text style={styles.departmentName}>
                  Course: {selectedCourse || 'N/A'}
                </Text>
                <Text style={styles.departmentName}>
                  Selected Students: {selectedStudents.length}
                </Text>
              </>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.assignButton,
              (!selectedFaculty || !selectedCourse || selectedStudents.length === 0) &&
                styles.disabledButton,
            ]}
            onPress={handleAssign}
            disabled={
              !selectedFaculty || !selectedCourse || selectedStudents.length === 0
            }
          >
            <Text style={styles.assignButtonText}>
              Assign Selected Students to Faculty
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 100,
  },
  filters: {
    marginBottom: SPACING.md,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  picker: { height: 50 },
  selectedText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.primary,
    marginBottom: 4,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  selectedCard: {
    backgroundColor: `${COLORS.primary}10`,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  studentInfo: { flex: 1 },
  studentName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  departmentName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCount: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  assignButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.small,
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
  assignButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});
