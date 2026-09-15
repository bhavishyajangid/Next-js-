import { Document } from "mongoose";

/* ---------------- MESSAGE TYPE ---------------- */
export interface MessageType {
  content: string;
  createdAt: Date;
}

/* ---------------- USER TYPE ---------------- */
export interface UserType extends Document {
  userName: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: MessageType[];
}

/* ---------------- API RESPONSE ---------------- */
export interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}
