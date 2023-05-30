interface User {
  id: number;
  providerId: string;
  provider: string;
  email: string | null;
  nickname: string | null;
}

export { User };
