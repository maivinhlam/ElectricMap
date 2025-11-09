import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ChargingStation, UserLocation } from "../types";

// Mock data for charging stations
const mockStations: ChargingStation[] = [
  {
    id: "1",
    name: "Tesla Supercharger",
    address: "123 Main St, San Francisco, CA",
    latitude: 37.7749,
    longitude: -122.4194,
    connectorTypes: ["Tesla", "CCS"],
    powerOutput: 150,
    availability: "available",
    price: 0.28,
    provider: "Tesla",
    amenities: ["WiFi", "Restroom", "Shopping"],
  },
  {
    id: "2",
    name: "ChargePoint Station",
    address: "456 Oak Ave, San Francisco, CA",
    latitude: 37.7849,
    longitude: -122.4094,
    connectorTypes: ["CCS", "CHAdeMO"],
    powerOutput: 50,
    availability: "occupied",
    price: 0.25,
    provider: "ChargePoint",
    amenities: ["Covered", "Shopping"],
  },
  {
    id: "3",
    name: "Electrify America",
    address: "789 Pine St, San Francisco, CA",
    latitude: 37.7649,
    longitude: -122.4294,
    connectorTypes: ["CCS", "CHAdeMO"],
    powerOutput: 350,
    availability: "available",
    price: 0.31,
    provider: "Electrify America",
    amenities: ["Fast Charging", "Credit Card"],
  },
];

export default function MapScreen() {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to show your position on the map."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const newUserLocation: UserLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(newUserLocation);
      setRegion({
        latitude: newUserLocation.latitude,
        longitude: newUserLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to get your location. Please try again.");
    }
  };

  const handleStationPress = (station: ChargingStation) => {
    navigation.navigate("StationDetail" as never, { station } as never);
  };

  const centerOnUser = () => {
    if (userLocation) {
      setRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      getUserLocation();
    }
  };

  const getMarkerColor = (availability: string) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {mockStations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
            description={`${station.powerOutput}kW - $${station.price}/kWh`}
            pinColor={getMarkerColor(station.availability)}
            onPress={() => handleStationPress(station)}
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.locationButton} onPress={centerOnUser}>
        <Ionicons name="locate" size={24} color="#007AFF" />
      </TouchableOpacity>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#4CAF50" }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#FF9800" }]} />
          <Text style={styles.legendText}>Occupied</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#F44336" }]} />
          <Text style={styles.legendText}>Out of Order</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  legend: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: "#333",
  },
});
