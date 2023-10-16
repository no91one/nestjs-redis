import { User } from './user.entity';
import { Request } from 'express';

export interface UserRequest extends Request {
  user: User; // Adjust the type based on your user structure
}
