import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

import { MotorcycleImage } from "../types";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SimpleImageViewerScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { image } = route.params as { image: MotorcycleImage };

  const [rotation, setRotation] = useState(0);

  // Rotate image
  const rotateImage = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
  };

  const rotateLeft = () => {
    const newRotation = (rotation - 90 + 360) % 360;
    setRotation(newRotation);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={styles.titleText} numberOfLines={1}>
            {image.title}
          </Text>
          <Text style={styles.subtitleText}>{image.year}</Text>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={rotateImage}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Image Container */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        maximumZoomScale={5}
        minimumZoomScale={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image.url || "https://via.placeholder.com/400x300" }}
            style={[
              styles.image,
              {
                transform: [{ rotate: `${rotation}deg` }],
                width:
                  rotation % 180 === 0 ? screenWidth * 0.9 : screenHeight * 0.6,
                height:
                  rotation % 180 === 0 ? screenHeight * 0.6 : screenWidth * 0.9,
              },
            ]}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.controlButton} onPress={rotateLeft}>
          <Ionicons
            name="refresh"
            size={20}
            color="white"
            style={{ transform: [{ scaleX: -1 }] }}
          />
          <Text style={styles.controlText}>Rotate Left</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={rotateImage}>
          <Ionicons name="refresh" size={20} color="white" />
          <Text style={styles.controlText}>Rotate Right</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setRotation(0)}
        >
          <Ionicons name="contract" size={20} color="white" />
          <Text style={styles.controlText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Pinch to zoom • Drag to move • Tap buttons to rotate
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    marginRight: 16,
  },
  titleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitleText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    marginTop: 2,
  },
  actionButton: {
    marginLeft: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  controlButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  controlText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  instructions: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  instructionText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    textAlign: "center",
  },
});
