enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
