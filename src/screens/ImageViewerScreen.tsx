import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  PinchGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

import { MotorcycleImage } from "../types";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ImageViewerScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { image } = route.params as { image: MotorcycleImage };

  const [rotation, setRotation] = useState(0);

  // Animated values for zoom and pan
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  // Reset transform values
  const resetTransform = () => {
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  // Rotate image
  const rotateImage = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    resetTransform();
  };

  // Pinch gesture handler for zoom
  const pinchGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startScale = scale.value;
    },
    onActive: (event, context) => {
      scale.value = context.startScale * event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else if (scale.value > 5) {
        scale.value = withSpring(5);
      }
    },
  });

  // Pan gesture handler for moving image when zoomed
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      if (scale.value > 1) {
        translateX.value = context.startX + event.translationX;
        translateY.value = context.startY + event.translationY;
      }
    },
    onEnd: () => {
      // Keep image within bounds
      const maxTranslateX = (screenWidth * (scale.value - 1)) / 2;
      const maxTranslateY = (screenHeight * (scale.value - 1)) / 2;

      if (translateX.value > maxTranslateX) {
        translateX.value = withSpring(maxTranslateX);
      } else if (translateX.value < -maxTranslateX) {
        translateX.value = withSpring(-maxTranslateX);
      }

      if (translateY.value > maxTranslateY) {
        translateY.value = withSpring(maxTranslateY);
      } else if (translateY.value < -maxTranslateY) {
        translateY.value = withSpring(-maxTranslateY);
      }
    },
  });

  // Animated style for the image
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation}deg` },
      ],
    };
  });

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

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={rotateImage}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={resetTransform}
          >
            <Ionicons name="contract" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Container */}
      <View style={styles.imageContainer}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={styles.gestureContainer}>
            <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
              <Animated.View style={styles.gestureContainer}>
                <Animated.Image
                  source={{
                    uri: image.url || "https://via.placeholder.com/400x300",
                  }}
                  style={[styles.image, animatedStyle]}
                  resizeMode="contain"
                />
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            const newRotation = (rotation - 90 + 360) % 360;
            setRotation(newRotation);
            resetTransform();
          }}
        >
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

        <TouchableOpacity style={styles.controlButton} onPress={resetTransform}>
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
  headerActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gestureContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.7,
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
