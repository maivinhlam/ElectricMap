import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const settingsSections = [
    {
      title: "Preferences",
      items: [
        {
          icon: "notifications",
          title: "Push Notifications",
          type: "switch",
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: "moon",
          title: "Dark Mode",
          type: "switch",
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          icon: "refresh",
          title: "Auto Refresh",
          type: "switch",
          value: autoRefresh,
          onToggle: setAutoRefresh,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: "person",
          title: "Profile",
          type: "navigation",
          onPress: () =>
            Alert.alert("Profile", "Profile settings coming soon!"),
        },
        {
          icon: "card",
          title: "Payment Methods",
          type: "navigation",
          onPress: () =>
            Alert.alert("Payment", "Payment settings coming soon!"),
        },
        {
          icon: "time",
          title: "Charging History",
          type: "navigation",
          onPress: () =>
            Alert.alert("History", "Charging history coming soon!"),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "help-circle",
          title: "Help & FAQ",
          type: "navigation",
          onPress: () => Alert.alert("Help", "Help center coming soon!"),
        },
        {
          icon: "mail",
          title: "Contact Support",
          type: "navigation",
          onPress: () => Alert.alert("Support", "Contact support coming soon!"),
        },
        {
          icon: "star",
          title: "Rate App",
          type: "navigation",
          onPress: () => Alert.alert("Rating", "Thanks for using ElectricMap!"),
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          icon: "information-circle",
          title: "About ElectricMap",
          type: "navigation",
          onPress: () =>
            Alert.alert(
              "About",
              "ElectricMap v1.0.0\nFind EV charging stations near you."
            ),
        },
        {
          icon: "document-text",
          title: "Privacy Policy",
          type: "navigation",
          onPress: () => Alert.alert("Privacy", "Privacy policy coming soon!"),
        },
        {
          icon: "shield-checkmark",
          title: "Terms of Service",
          type: "navigation",
          onPress: () => Alert.alert("Terms", "Terms of service coming soon!"),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === "switch"}
      >
        <View style={styles.settingLeft}>
          <Ionicons name={item.icon} size={24} color="#007AFF" />
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>
        {item.type === "switch" ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: "#E0E0E0", true: "#007AFF" }}
            thumbColor={item.value ? "#ffffff" : "#f4f3f4"}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) =>
                renderSettingItem(item, itemIndex)
              )}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>ElectricMap v1.0.0</Text>
          <Text style={styles.footerSubtext}>Made with ⚡ for EV drivers</Text>
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
  },
  header: {
    padding: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: "#1a1a1a",
    marginLeft: 12,
  },
  footer: {
    alignItems: "center",
    padding: 32,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#999",
  },
});
