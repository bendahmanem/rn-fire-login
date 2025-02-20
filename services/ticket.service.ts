import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface Ticket {
  name: string;
  status: string;
  priority: string;
}

async function getTicketsDB() {
  console.log("Getting tickets from DB");

  const querySnapshot = await getDocs(collection(db, "Tickets"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}
const getAllTickets = async (): Promise<Ticket[]> => {
  const ticketsCollection = collection(db, "Tickets");
  const snapshot = await getDocs(ticketsCollection);
  console.log("Snapshot:", snapshot);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Ticket),
  }));
};

export { getAllTickets, getTicketsDB };
