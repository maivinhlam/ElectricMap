import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ChargingStation } from "../types";

export default function StationDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { station } = route.params as { station: ChargingStation };

  const openDirections = () => {
    const url = `https://maps.google.com/?q=${station.latitude},${station.longitude}`;
    Linking.openURL(url);
  };

  const getStatusColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "#4CAF50";
      case "occupied":
        return "#FF9800";
      case "out-of-order":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  const getStatusText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available";
      case "occupied":
        return "Occupied";
      case "out-of-order":
        return "Out of Order";
      default:
        return "Unknown";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.stationName}>{station.name}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(station.availability) },
            ]}
          >
            <Text style={styles.statusText}>
              {getStatusText(station.availability)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.address}>{station.address}</Text>
          <TouchableOpacity
            style={styles.directionsButton}
            onPress={openDirections}
          >
            <Ionicons name="navigate" size={20} color="white" />
            <Text style={styles.directionsText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Charging Details</Text>
          <View style={styles.detailRow}>
            <Ionicons name="flash" size={20} color="#007AFF" />
            <Text style={styles.detailLabel}>Power Output:</Text>
            <Text style={styles.detailValue}>{station.powerOutput} kW</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="cash" size={20} color="#007AFF" />
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>${station.price}/kWh</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="business" size={20} color="#007AFF" />
            <Text style={styles.detailLabel}>Provider:</Text>
            <Text style={styles.detailValue}>{station.provider}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connector Types</Text>
          <View style={styles.connectorsContainer}>
            {station.connectorTypes.map((connector, index) => (
              <View key={index} style={styles.connectorChip}>
                <Text style={styles.connectorText}>{connector}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {station.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Reserve Station</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  stationName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    lineHeight: 22,
  },
  directionsButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  directionsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
    marginLeft: 12,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  connectorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  connectorChip: {
    backgroundColor: "#e3f2fd",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  connectorText: {
    color: "#1976d2",
    fontSize: 14,
    fontWeight: "500",
  },
  amenitiesContainer: {
    flexDirection: "column",
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  reserveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  reserveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
