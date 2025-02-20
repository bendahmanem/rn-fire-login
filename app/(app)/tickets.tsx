import AddTicketForm from "@/components/addTicket";
import TicketList from "@/components/TicketList";
import { getAllTickets, getTicketsDB, Ticket } from "@/services/ticket.service";
import { useEffect, useState } from "react";

const Tickets = () => {
  const ticketsData: Ticket[] = [];
  const [yourTicketsData, setYourTicketsData] = useState<Ticket[]>(ticketsData);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const getTickets = async () => {
      const tickets = await getAllTickets();
      console.log("Tickets:", tickets);
      //getTicketsDB();
      setYourTicketsData(tickets);
    };
    getTickets();
  }, []);

  const handleTicketPress = (ticket: Ticket) => {
    console.log("Ticket pressed:", ticket);
    // Navigate to ticket details or perform other actions
  };

  const handleAddTicket = () => {
    console.log("Add ticket button pressed");
    setIsModalVisible(true);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TicketList
        tickets={yourTicketsData} // Replace with your actual data
        onTicketPress={handleTicketPress}
        onAddTicket={handleAddTicket}
      />
      <AddTicketForm
        visible={isModalVisible}
        onClose={onModalClose}
        onSave={handleAddTicket}
      />
    </>
  );
};

export default Tickets;
