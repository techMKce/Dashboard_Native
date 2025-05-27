import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {
  COLORS,
  FONT,
  SIZES,
  SPACING,
  SHADOWS,
} from '@/constants/theme';
import Header from '@/components/shared/Header';
import {
  Search,
  Plus,
  Mail,
  Phone,
  Calendar as GraduationCap,
  Trash2,
  CreditCard as Edit2,
} from 'lucide-react-native';

const mockStudents = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@student.edu',
    phone: '+1 (555) 987-6543',
    department: 'Computer Science',
    enrollmentYear: '2022',
    courses: ['Data Structures', 'Operating Systems'],
  },
  {
    id: '2',
    name: 'Bob Williams',
    email: 'bob.williams@student.edu',
    phone: '+1 (555) 876-5432',
    department: 'Electronics',
    enrollmentYear: '2021',
    courses: ['Digital Logic', 'Signal Processing'],
  },
];

export default function StudentManagementScreen() {
  const [studentList, setStudentList] = useState(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    enrollmentYear: '',
  });

  const filteredStudents = studentList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = () => {
    const newEntry = {
      ...newStudent,
      id: Date.now().toString(),
      courses: [],
    };

    setStudentList((prev) => [newEntry, ...prev]);
    setIsAddModalVisible(false);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      department: '',
      enrollmentYear: '',
    });
  };

  // New function to confirm before deleting
  const handleDeleteStudent = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this student?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setStudentList((prev) => prev.filter(student => student.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Student Management" />

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.gray}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddModalVisible(true)}
          >
            <Plus size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.studentCard}>
              <View style={styles.studentHeader}>
                <View>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.enrollmentYear}>Enrollment: {item.enrollmentYear}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.editButton}>
                    <Edit2 size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteStudent(item.id)}
                  >
                    <Trash2 size={16} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.studentDetails}>
                <View style={styles.detailItem}>
                  <Mail size={16} color={COLORS.gray} />
                  <Text style={styles.detailText}>{item.email}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Phone size={16} color={COLORS.gray} />
                  <Text style={styles.detailText}>{item.phone}</Text>
                </View>

                <View style={styles.detailItem}>
                  <GraduationCap size={16} color={COLORS.gray} />
                  <Text style={styles.detailText}>{item.department}</Text>
                </View>
              </View>

              <View style={styles.coursesContainer}>
                <Text style={styles.coursesLabel}>Enrolled Courses:</Text>
                <View style={styles.coursesList}>
                  {item.courses.map((course, index) => (
                    <View key={index} style={styles.courseBadge}>
                      <Text style={styles.courseBadgeText}>{course}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.studentList}
        />

        <Modal
          visible={isAddModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsAddModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Student</Text>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={newStudent.name}
                onChangeText={(text) =>
                  setNewStudent({ ...newStudent, name: text })
                }
                placeholderTextColor={COLORS.gray}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={newStudent.email}
                onChangeText={(text) =>
                  setNewStudent({ ...newStudent, email: text })
                }
                placeholderTextColor={COLORS.gray}
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={newStudent.phone}
                onChangeText={(text) =>
                  setNewStudent({ ...newStudent, phone: text })
                }
                placeholderTextColor={COLORS.gray}
                keyboardType="phone-pad"
              />

              <TextInput
                style={styles.input}
                placeholder="Department"
                value={newStudent.department}
                onChangeText={(text) =>
                  setNewStudent({ ...newStudent, department: text })
                }
                placeholderTextColor={COLORS.gray}
              />

              <TextInput
                style={styles.input}
                placeholder="Enrollment Year"
                value={newStudent.enrollmentYear}
                onChangeText={(text) =>
                  setNewStudent({ ...newStudent, enrollmentYear: text })
                }
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsAddModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.addButtonModal]}
                  onPress={handleAddStudent}
                >
                  <Text style={styles.addButtonText}>Add Student</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  searchIcon: {
    position: 'absolute',
    left: SPACING.md,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    paddingLeft: SPACING.xl,
    paddingRight: SPACING.md,
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    ...SHADOWS.small,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
    ...SHADOWS.small,
  },
  studentList: {
    paddingBottom: 100,
  },
  studentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  studentName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
  },
  enrollmentYear: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  editButton: {
    padding: SPACING.xs,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  studentDetails: {
    marginBottom: SPACING.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginLeft: SPACING.xs,
  },
  coursesContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: SPACING.sm,
  },
  coursesLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  coursesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  courseBadge: {
    backgroundColor: `${COLORS.secondary}20`,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
  },
  courseBadgeText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xs,
    color: COLORS.secondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    width: '90%',
    maxWidth: 500,
  },
  modalTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontFamily: FONT.regular,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  cancelButton: {
    backgroundColor: COLORS.background,
  },
  addButtonModal: {
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.gray,
  },
  addButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});
