export interface LoginResponseKeycloak {
  user: any;
  role: string[];
  access_token: string;
  refresh_token: string;
  expire_in: number;
  token_type: string;
  username: string;
}
