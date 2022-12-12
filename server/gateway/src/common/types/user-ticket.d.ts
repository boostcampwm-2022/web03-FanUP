interface UserTicket {
  id: number;
  userId: number;
  ticketId: number;
  createdAt: string;
  fanupId: string | null;
}

export { UserTicket };
