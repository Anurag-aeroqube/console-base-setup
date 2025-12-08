export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface Lead {
  id: number;
  name: string;
  city?: string;
  stage?: string;
  sales_person?: string;
  phone?: string;
  anurag?: string;
}