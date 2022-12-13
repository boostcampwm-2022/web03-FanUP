export interface Ticket {
    ticketingDate: Date;
    ticketingTime: string;
    description: string;
    artistName: string;
    price: number;
    ticketId: number;
    userCount: number;
    fanUpDate: Date;
    fanUpTime: string;
}

export interface TicketSubmitData {
    title: string;
    content: string;
    salesTime: Date;
    startTime: Date;
    totalAmount: number;
    numberTeam: number;
    timeTeam: nunber;
    price: number;
    [key: string]: string | Date | number;
}

interface ITicket {
    id: number;
    name: string;
    title: string;
    profileUrl: string;
    startTime: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MyTicket extends ITicket {
    roomId: number;
}
export interface TicketSales extends ITicket {
    salesTime: Date;
    price: number;
}

export interface TicketDetail extends ITicket {
    description: string;
    salesTime: Date;
    price: number;
    totalAmount: number;
}
