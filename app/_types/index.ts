export type UserData = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  has_password: boolean;
  cnpj: string;
  fantasy_name: string;
  corporate_name: string;
  type: string;
  id: number;
  inkluer: boolean;
  inkluer_leader: boolean;
  email_verified_at: boolean;
  accepted_terms: boolean;
  status: string;
  permissions: {
      externalHunting: boolean;
  };
}