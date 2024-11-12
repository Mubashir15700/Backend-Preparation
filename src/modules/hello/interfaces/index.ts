export interface Data {
  id: number;
  name: string;
  description: string;
}

export interface HelloResponse {
  status: string;
  message: string;
  data?: Data[];
}

export interface HelloByIdResponse {
  status: string;
  message: string;
  data?: Data;
}
