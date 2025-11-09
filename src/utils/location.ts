import { UserLocation } from "../types";

/**
 * Calculate the distance between two points using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Format distance for display
 * @param distance Distance in kilometers
 * @returns Formatted distance string
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

/**
 * Get the closest stations to a user location
 * @param userLocation User's current location
 * @param stations Array of charging stations
 * @param limit Maximum number of stations to return
 * @returns Sorted array of stations with distances
 */
export function getClosestStations(
  userLocation: UserLocation,
  stations: any[],
  limit: number = 10
) {
  const stationsWithDistance = stations.map((station) => ({
    ...station,
    distance: calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      station.latitude,
      station.longitude
    ),
  }));

  return stationsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

/**
 * Filter stations by availability
 * @param stations Array of charging stations
 * @param availability Availability status to filter by
 * @returns Filtered array of stations
 */
export function filterStationsByAvailability(
  stations: any[],
  availability: string
) {
  return stations.filter((station) => station.availability === availability);
}

/**
 * Convert availability status to user-friendly text
 * @param availability Availability status
 * @returns User-friendly status text
 */
export function getAvailabilityText(availability: string): string {
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
}

/**
 * Get color for availability status
 * @param availability Availability status
 * @returns Color hex code
 */
export function getAvailabilityColor(availability: string): string {
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
}
