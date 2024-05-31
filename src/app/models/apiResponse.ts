import { User } from './user';

export interface ApiResponse {
  results: User[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
