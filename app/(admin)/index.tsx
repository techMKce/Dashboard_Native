import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/shared/Header';
import { useAuth } from '@/context/AuthContext';
import { Users, GraduationCap, BookOpen, ChevronRight } from 'lucide-react-native';

const systemStatus = {
  studentsEnrolled: 0,
  facultyActive: 1,
  coursesAvailable: 5,
};


export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Header title={`Welcome, ${user?.name.split(' ')[0] || 'Admin'}`} />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.facultyCard]}>
            <View style={styles.statIconContainer}>
              <Users size={24} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.statValue}>25</Text>
              <Text style={styles.statLabel}>Total Faculty</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, styles.studentsCard]}>
            <View style={styles.statIconContainer}>
              <GraduationCap size={24} color={COLORS.secondary} />
            </View>
            <View>
              <Text style={styles.statValue}>500</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, styles.coursesCard]}>
            <View style={styles.statIconContainer}>
              <BookOpen size={24} color={COLORS.accent} />
            </View>
            <View>
              <Text style={styles.statValue}>30</Text>
              <Text style={styles.statLabel}>Total Courses</Text>
            </View>
          </View>
        </View>


        {/* System Status Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>System Status</Text>
          <Text style={styles.sectionSubtitle}>Current system overview</Text>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Students Enrolled</Text>
            <Text style={styles.statusValue}>{systemStatus.studentsEnrolled}</Text>
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Faculty Active</Text>
            <Text style={styles.statusValue}>{systemStatus.facultyActive}</Text>
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Courses Available</Text>
            <Text style={styles.statusValue}>{systemStatus.coursesAvailable}</Text>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    flex: 1,
    minWidth: '30%',
    ...SHADOWS.small,
  },
  facultyCard: {
    borderTopColor: COLORS.primary,
    borderTopWidth: 3,
  },
  studentsCard: {
    borderTopColor: COLORS.secondary,
    borderTopWidth: 3,
  },
  coursesCard: {
    borderTopColor: COLORS.accent,
    borderTopWidth: 3,
  },
  statIconContainer: {
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.lg,
    color: COLORS.darkGray,
  },
  statLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xs,
    color: COLORS.gray,
  },
  sectionContainer: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  actionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    width: '48%',   // roughly two cards per row with spacing
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.small,
    marginBottom: SPACING.sm,
  },
  actionLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    flexShrink: 1,
  },
  statusCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...SHADOWS.small,
  },
  statusLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.md,
    color: COLORS.gray,
  },
  statusValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.md,
    color: COLORS.darkGray,
  },
});
