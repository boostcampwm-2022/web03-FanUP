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
    ticket_id: number;
    name: string;
    title: string;
    profile_url: string;
    start_time: Date;
}

interface MyTicket extends ITicket {}
export interface TicketSales extends ITicket {
    sales_time: Date;
    price: number;
}

export interface TicketDetail extends ITicket {
    description: string;
    sales_time: Date;
    price: number;
    total_amount: number;
}
