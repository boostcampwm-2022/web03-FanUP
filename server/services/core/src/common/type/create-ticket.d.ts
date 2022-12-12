interface CreateTicketDto {
  title: string;
  content: string;
  artistId: number;
  salesTime: Date;
  startTime: Date;
  totalAmount: number;
  numberTeam: number;
  timeTeam: number;
  price: number;
}

export { CreateTicketDto };
