import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const quickActions = [
    {
      icon: "map",
      title: "Find Stations",
      description: "Locate nearby charging stations",
    },
    {
      icon: "flash",
      title: "Quick Charge",
      description: "Find fast charging options",
    },
    {
      icon: "car",
      title: "My Vehicle",
      description: "Manage vehicle settings",
    },
    { icon: "time", title: "History", description: "View charging history" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>ElectricMap</Text>
          <Text style={styles.subtitle}>
            Find electric vehicle charging stations
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1,250+</Text>
            <Text style={styles.statLabel}>Stations</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Uptime</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionCard}>
              <Ionicons name={action.icon as any} size={32} color="#007AFF" />
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDescription}>{action.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          <View style={styles.newsCard}>
            <Text style={styles.newsTitle}>New Charging Stations Added</Text>
            <Text style={styles.newsContent}>
              15 new fast-charging stations have been added to the network this
              week.
            </Text>
          </View>
          <View style={styles.newsCard}>
            <Text style={styles.newsTitle}>App Update Available</Text>
            <Text style={styles.newsContent}>
              Version 2.1 includes improved navigation and real-time
              availability.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 8,
    textAlign: "center",
  },
  actionDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  newsSection: {
    marginBottom: 32,
  },
  newsCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
