import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StationCardProps {
  name: string;
  distance: string;
  availability: "available" | "occupied" | "out-of-order";
  price: number;
  onPress: () => void;
}

export default function StationCard({
  name,
  distance,
  availability,
  price,
  onPress,
}: StationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
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

  const getStatusText = (status: string) => {
    switch (status) {
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(availability) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(availability)}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>${price}/kWh</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
});
