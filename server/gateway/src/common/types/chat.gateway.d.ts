interface JoinChatRoom {
  email: string;
  roomName: string;
}

interface Welcome {
  email: string;
  socketID: string;
}

interface SendMessage {
  email: string;
  roomName: string;
  isArtist: boolean;
  message: string;
}

interface ReceiveMessage {
  email: string;
  isArtist: boolean;
  message: string;
}

export { JoinChatRoom, Welcome, SendMessage, ReceiveMessage };
