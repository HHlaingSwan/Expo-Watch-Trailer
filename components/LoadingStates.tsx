import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const Loader = () => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    );
    rotateLoop.start();

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.3,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulseLoop.start();

    return () => {
      rotateLoop.stop();
      pulseLoop.stop();
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.loaderWrapper}>
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ rotate: spin }, { scale: scaleAnim }] },
          ]}
        />
        <Animated.View
          style={[styles.circleInner, { opacity: opacityAnim }]}
        />
        <View style={styles.dot} />
      </View>
      <Text style={styles.text}>Loading movies...</Text>
      <Text style={styles.subText}>Please wait a moment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderWrapper: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#22c55e",
    borderTopColor: "transparent",
  },
  circleInner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#22c55e",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
  },
  text: {
    color: "#e5e7eb",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    color: "#6b7280",
    marginTop: 6,
    fontSize: 13,
  },
});

export default Loader;
