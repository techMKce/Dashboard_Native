import React, { useState } from 'react'; 
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';
import dayjs from 'dayjs';
import Header from '@/components/shared/Header';

const mockCourses = [
  { id: 'CS101', name: 'Computer Science', faculty: 'Dr. John Smith' },
  { id: 'MATH201', name: 'Calculus II', faculty: 'Prof. Sarah Johnson' },
  { id: 'PHYS101', name: 'General Physics', faculty: 'Dr. Michael Brown' },
  { id: 'ENG102', name: 'English Composition', faculty: 'Prof. Emily Davis' },
];

// Dummy timeSlots array since original had it but was missing here
const timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];

export default function ScheduleManagementScreen() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<
    { courseId: string; courseName: string; date: string; time: string }[]
  >([]);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  // Calculate difference in days between fromDate and toDate
  const getDateRange = (): string[] => {
    const dates = [];
    let current = dayjs(fromDate);
    const end = dayjs(toDate);
    if (end.isBefore(current)) return dates;

    while (current.isBefore(end) || current.isSame(end)) {
      dates.push(current.format('MMM D, YYYY'));
      current = current.add(1, 'day');
    }
    return dates;
  };

  const generateSchedule = () => {
    // Use all courses if none selected
    const coursesToSchedule = selectedCourses.length > 0
      ? mockCourses.filter(c => selectedCourses.includes(c.id))
      : mockCourses;

    const dates = getDateRange();
    if (dates.length === 0) {
      alert('Please select a valid date range.');
      return;
    }

    const schedule: typeof generatedSchedule = [];

    // Assign courses to dates and timeSlots cyclically
    let dateIndex = 0;
    let timeSlotIndex = 0;

    coursesToSchedule.forEach(course => {
      schedule.push({
        courseId: course.id,
        courseName: course.name,
        date: dates[dateIndex],
        time: timeSlots[timeSlotIndex],
      });

      // Cycle through time slots, then dates
      timeSlotIndex++;
      if (timeSlotIndex >= timeSlots.length) {
        timeSlotIndex = 0;
        dateIndex++;
        if (dateIndex >= dates.length) {
          dateIndex = 0; // start over if more courses than slots*dates
        }
      }
    });

    setGeneratedSchedule(schedule);
    setSuccessMessage('Schedule generated successfully!');
  };

  const calculateDuration = () => {
    const diff = dayjs(toDate).diff(dayjs(fromDate), 'day');
    return diff >= 0 ? `${diff + 1} days` : 'Invalid range';
  };

  return (
    <View style={styles.container}>
        <Header title="Schedule" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Courses Selection */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Available Courses</Text>
          <Text style={styles.subtext}>Select a course to create schedule</Text>
          {mockCourses.map(course => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => toggleCourse(course.id)}
            >
              <Checkbox status={selectedCourses.includes(course.id) ? 'checked' : 'unchecked'} />
              <View>
                <Text style={styles.courseTitle}>
                  {course.id} - {course.name}
                </Text>
                <Text style={styles.facultyName}>Faculty: {course.faculty}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.selectedBox}>
            <Text style={styles.selectedText}>Selected Courses ({selectedCourses.length})</Text>
            {selectedCourses.length === 0 && <Text style={styles.linkText}>None (will schedule all)</Text>}
            {selectedCourses.map(id => {
              const course = mockCourses.find(c => c.id === id);
              return (
                <Text key={id} style={styles.linkText}>
                  {course?.id} - {course?.name}
                </Text>
              );
            })}
          </View>
        </View>

        {/* Date Range */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Schedule Period</Text>
          <Text style={styles.subtext}>Select the date range for the schedule</Text>

          <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateBox}>
            <Text style={styles.dateText}>📅 From Date: {dayjs(fromDate).format('MMM D, YYYY')}</Text>
          </TouchableOpacity>
          {showFromPicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={(_, date) => {
                setShowFromPicker(Platform.OS === 'ios');
                if (date) setFromDate(date);
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateBox}>
            <Text style={styles.dateText}>📅 To Date: {dayjs(toDate).format('MMM D, YYYY')}</Text>
          </TouchableOpacity>
          {showToPicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={(_, date) => {
                setShowToPicker(Platform.OS === 'ios');
                if (date) setToDate(date);
              }}
            />
          )}

          <View style={styles.selectedBox}>
            <Text style={styles.successText}>Selected Period</Text>
            <Text style={styles.linkText}>
              From {dayjs(fromDate).format('MMM DD, YYYY')} to {dayjs(toDate).format('MMM DD, YYYY')}
            </Text>
            <Text style={styles.durationText}>Duration: {calculateDuration()}</Text>
          </View>
        </View>

        {/* Generate Button */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Generate Schedule</Text>
          <Text style={styles.subtext}>Create the schedule for Exams</Text>
          <TouchableOpacity
            style={[styles.generateBtn, selectedCourses.length === 0 && { backgroundColor: '#ccc' }]}
            onPress={generateSchedule}
          >
            <Text style={styles.generateText}>Generate</Text>
          </TouchableOpacity>
          {successMessage.length > 0 && (
            <View style={{ marginTop: 12, padding: 12, backgroundColor: '#d4edda', borderRadius: 8 }}>
              <Text style={{ color: '#155724', fontWeight: '600' }}>{successMessage}</Text>
            </View>
          )}
          <View style={{ marginTop: 12 }}>
            <Text style={styles.bullet}>• Select one or more courses</Text>
            <Text style={styles.bullet}>• Choose start and end dates</Text>
            <Text style={styles.bullet}>• Click Generate to create schedule</Text>
            <Text style={{ marginTop: 6, fontStyle: 'italic', color: '#777' }}>
              (If no courses selected, all courses will be scheduled)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBFC' },
  content: { padding: 16, gap: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  subtext: {
    color: '#777',
    marginBottom: 12,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a57df',
  },
  facultyName: {
    fontSize: 14,
    color: '#444',
  },
  selectedBox: {
    marginTop: 12,
    backgroundColor: '#EEF4FF',
    padding: 12,
    borderRadius: 8,
  },
  selectedText: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  linkText: {
    color: '#0a57df',
    marginVertical: 2,
  },
  dateBox: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  durationText: {
    color: 'green',
    marginTop: 4,
  },
  bullet: {
    color: '#555',
    fontSize: 14,
  },
  generateBtn: {
    backgroundColor: '#0a57df',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  generateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  successText: {
    color: 'green',
    fontWeight: '600',
  },
});
