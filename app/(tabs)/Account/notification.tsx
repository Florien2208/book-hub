import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Order Delivered Successfully",
      message:
        "Your order #12345 has been delivered to your location. Thank you for choosing our service!",
      time: "2 min ago",
      type: "success",
      isRead: false,
      icon: "checkmark-circle",
    },
    {
      id: 2,
      title: "Special Offer Available",
      message:
        "Get 50% off on your next order. Limited time offer. Use code SAVE50 at checkout.",
      time: "1 hour ago",
      type: "offer",
      isRead: false,
      icon: "gift",
    },
    {
      id: 3,
      title: "Delivery Update",
      message:
        "Your delivery partner is on the way. Expected arrival time is 15 minutes.",
      time: "3 hours ago",
      type: "info",
      isRead: true,
      icon: "car",
    },
    {
      id: 4,
      title: "Payment Successful",
      message:
        "Payment of $25.99 has been processed successfully for order #12344.",
      time: "1 day ago",
      type: "success",
      isRead: false,
      icon: "card",
    },
    {
      id: 5,
      title: "New Service Available",
      message:
        "We've launched Express Delivery in your area. Get your orders delivered in 30 minutes!",
      time: "2 days ago",
      type: "info",
      isRead: true,
      icon: "flash",
    },
    {
      id: 6,
      title: "Order Confirmation",
      message:
        "Your order #12343 has been confirmed and is being prepared. You'll receive updates shortly.",
      time: "3 days ago",
      type: "info",
      isRead: false,
      icon: "receipt",
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeColor = (type) => {
    switch (type) {
      case "success":
        return "#10B981";
      case "offer":
        return "#F59E0B";
      case "info":
        return "#3B82F6";
      default:
        return "#6B7280";
    }
  };

  const getTypeBackground = (type) => {
    switch (type) {
      case "success":
        return "#ECFDF5";
      case "offer":
        return "#FEF3C7";
      case "info":
        return "#EFF6FF";
      default:
        return "#F3F4F6";
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
    setModalVisible(false);
  };

  const openNotification = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true;
  });

  const renderNotificationItem = (notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationCard,
        !notification.isRead && styles.unreadCard,
      ]}
      onPress={() => openNotification(notification)}
      activeOpacity={0.8}
    >
      <View style={styles.notificationContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: getTypeBackground(notification.type) },
          ]}
        >
          <Ionicons
            name={notification.icon}
            size={20}
            color={getTypeColor(notification.type)}
          />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text
              style={[
                styles.notificationTitle,
                !notification.isRead && styles.unreadTitle,
              ]}
              numberOfLines={1}
            >
              {notification.title}
            </Text>
            {!notification.isRead && <View style={styles.unreadDot} />}
          </View>

          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>

          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNotificationModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notification Details</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {selectedNotification && (
            <ScrollView
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.modalNotificationHeader}>
                <View
                  style={[
                    styles.modalIconContainer,
                    {
                      backgroundColor: getTypeBackground(
                        selectedNotification.type
                      ),
                    },
                  ]}
                >
                  <Ionicons
                    name={selectedNotification.icon}
                    size={24}
                    color={getTypeColor(selectedNotification.type)}
                  />
                </View>
                <View style={styles.modalHeaderText}>
                  <Text style={styles.modalNotificationTitle}>
                    {selectedNotification.title}
                  </Text>
                  <Text style={styles.modalNotificationTime}>
                    {selectedNotification.time}
                  </Text>
                </View>
              </View>

              <Text style={styles.modalNotificationMessage}>
                {selectedNotification.message}
              </Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteNotification(selectedNotification.id)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
                <Text style={styles.deleteButtonText}>Delete Notification</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-outline" size={64} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>No notifications</Text>
      <Text style={styles.emptySubtitle}>
        {filter === "unread"
          ? "You're all caught up!"
          : filter === "read"
          ? "No read notifications yet"
          : "You don't have any notifications yet"}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#E0F2FE", "#F3E8FF", "#FDF2F8", "#FEF3C7"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <View style={styles.headerActions}>
              {unreadCount > 0 && (
                <Text style={styles.badgeText}>{unreadCount} new</Text>
              )}
              <TouchableOpacity
                onPress={markAllAsRead}
                style={[
                  styles.markAllButton,
                  unreadCount === 0 && styles.disabledButton,
                ]}
                disabled={unreadCount === 0}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.markAllText,
                    unreadCount === 0 && styles.disabledText,
                  ]}
                >
                  Mark all read
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            {["all", "unread", "read"].map((filterType) => (
              <TouchableOpacity
                key={filterType}
                style={[
                  styles.filterTab,
                  filter === filterType && styles.activeFilterTab,
                ]}
                onPress={() => setFilter(filterType)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === filterType && styles.activeFilterText,
                  ]}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  {filterType === "unread" && unreadCount > 0 && (
                    <Text style={styles.filterCount}> ({unreadCount})</Text>
                  )}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notifications List */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {filteredNotifications.length > 0
            ? filteredNotifications.map(renderNotificationItem)
            : renderEmptyState()}
        </ScrollView>

        {renderNotificationModal()}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "600",
    marginRight: 12,
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: "#F9FAFB",
  },
  markAllText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "600",
  },
  disabledText: {
    color: "#9CA3AF",
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  activeFilterTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#1F2937",
    fontWeight: "600",
  },
  filterCount: {
    color: "#EF4444",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
    backgroundColor: "#FEFFFE",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  unreadTitle: {
    color: "#111827",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalNotificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  modalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalNotificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  modalNotificationTime: {
    fontSize: 14,
    color: "#6B7280",
  },
  modalNotificationMessage: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    marginBottom: 24,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FEF2F2",
  },
  deleteButtonText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "600",
    marginLeft: 8,
  },
});
export default NotificationsScreen;