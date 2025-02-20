import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";

// Interface for the Ticket as provided
interface Ticket {
  name: string;
  status: string;
  priority: string;
}

// Props interface for the TicketList component
interface TicketListProps {
  tickets: Ticket[];
  onTicketPress?: (ticket: Ticket) => void;
  onAddTicket?: () => void;
}

// Mock data (you mentioned you'll handle data fetching)
const mockTickets: Ticket[] = [
  { name: "Fix login screen bug", status: "Open", priority: "High" },
  {
    name: "Update user profile page",
    status: "In Progress",
    priority: "Medium",
  },
  { name: "Implement dark mode", status: "Open", priority: "Low" },
  { name: "Add payment integration", status: "Closed", priority: "High" },
  { name: "Optimize image loading", status: "In Progress", priority: "Medium" },
];

// Helper function to get color based on priority
const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case "high":
      return "#FF5252";
    case "medium":
      return "#FFD740";
    case "low":
      return "#4CAF50";
    default:
      return "#9E9E9E";
  }
};

// Helper function to get color based on status
const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "open":
      return "#2196F3";
    case "in progress":
      return "#FF9800";
    case "closed":
      return "#9E9E9E";
    default:
      return "#9E9E9E";
  }
};

const TicketList: React.FC<TicketListProps> = ({
  tickets = mockTickets,
  onTicketPress,
  onAddTicket,
}) => {
  const renderTicketItem = ({ item }: { item: Ticket }) => {
    return (
      <TouchableOpacity
        style={styles.ticketItem}
        onPress={() => onTicketPress && onTicketPress(item)}
      >
        <View style={styles.ticketContent}>
          <Text style={styles.ticketName}>{item.name}</Text>

          <View style={styles.ticketDetails}>
            <View style={styles.infoContainer}>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>

            <View style={styles.infoContainer}>
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(item.priority) },
                ]}
              />
              <Text style={styles.priorityText}>{item.priority}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tickets</Text>
      </View>

      <FlatList
        data={tickets}
        renderItem={renderTicketItem}
        keyExtractor={(item, index) => `ticket-${index}`}
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={onAddTicket}
        activeOpacity={0.8}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    position: "relative",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
  },
  listContent: {
    padding: 16,
  },
  ticketItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketContent: {
    flex: 1,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 12,
  },
  ticketDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#616161",
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 14,
    color: "#616161",
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    zIndex: 999,
  },
  floatingButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default TicketList;
