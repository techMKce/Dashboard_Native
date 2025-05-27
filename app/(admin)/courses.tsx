import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import {
  COLORS,
  FONT,
  SIZES,
  SPACING,
  SHADOWS,
} from '@/constants/theme';
import Header from '@/components/shared/Header';
import { Search, Plus } from 'lucide-react-native';

const mockCourses = [
  {
    id: 'c1',
    name: 'Data Structures',
    description: 'Learn about arrays, linked lists, trees, and graphs.',
    enabled: true,
  },
  {
    id: 'c2',
    name: 'Operating Systems',
    description: 'Understand process management and memory allocation.',
    enabled: false,
  },
  {
    id: 'c3',
    name: 'Digital Logic',
    description: 'Basics of logic gates, circuits, and boolean algebra.',
    enabled: true,
  },
  {
    id: 'c4',
    name: 'Signal Processing',
    description: 'Study analog and digital signal processing concepts.',
    enabled: false,
  },
];

export default function CoursesManagementScreen() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCourseStatus = (id: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, enabled: !course.enabled } : course
      )
    );
  };

  const handleAddCourse = () => {
    if (!newCourseName.trim() || !newCourseDesc.trim()) return;
    const newCourse = {
      id: Date.now().toString(),
      name: newCourseName.trim(),
      description: newCourseDesc.trim(),
      enabled: true,
    };
    setCourses((prev) => [newCourse, ...prev]);
    setNewCourseName('');
    setNewCourseDesc('');
    setIsAddModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Courses Management" />

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
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
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.courseCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.courseName}>{item.name}</Text>
                <Text style={styles.courseDescription}>{item.description}</Text>
              </View>

              <View style={styles.statusContainer}>
                <Switch
                  value={item.enabled}
                  onValueChange={() => toggleCourseStatus(item.id)}
                  thumbColor={item.enabled ? COLORS.primary : COLORS.gray}
                  trackColor={{ false: COLORS.lightGray, true: COLORS.primaryLight }}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: item.enabled ? COLORS.primary : COLORS.gray },
                  ]}
                >
                  {item.enabled ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.courseList}
        />

        <Modal
          visible={isAddModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsAddModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Course</Text>

              <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={newCourseName}
                onChangeText={setNewCourseName}
                placeholderTextColor={COLORS.gray}
              />
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Course Description"
                value={newCourseDesc}
                onChangeText={setNewCourseDesc}
                multiline
                placeholderTextColor={COLORS.gray}
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
                  onPress={handleAddCourse}
                >
                  <Text style={styles.addButtonText}>Add Course</Text>
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
  courseList: {
    paddingBottom: 100,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  courseName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
  },
  courseDescription: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  statusText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    marginLeft: SPACING.xs,
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
    maxWidth: 400,
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
    textAlignVertical: 'top',
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
