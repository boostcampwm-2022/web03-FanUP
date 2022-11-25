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

export interface TodayTicket extends Ticket {}

export interface DetailTicket extends Ticket {}
