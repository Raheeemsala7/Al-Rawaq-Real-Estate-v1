export interface DataUser {
  _id: string;

  name: string;
  email: string;
  phone: string;

  role: "customer" | "admin" | "agent" | string;

  language: "ar" | "en" | string;
  theme: "light" | "dark" | string;

  avatarUrl: string | null;
  avatarPublicId: string | null;

  gender: string | null;

  isActive: boolean;
  isVerified: boolean;

  isEmailVerified: boolean;
  is2FAEnabled: boolean;
  isGoogleUser: boolean;

  favorites: string[];

  fcmToken: string | null;

  privacySettings: {
    showPhone: boolean;
    showEmail: boolean;
    showOnlineStatus: boolean;
  };

  notificationSettings: {
    bookingUpdates: boolean;
    chatMessages: boolean;
    promotions: boolean;
  };

  refreshToken: string;

  otpCode: string | null;
  otpExpires: string | null;

  addresses: unknown[];

  passwordHash?: string;

  createdAt: string;
  updatedAt: string;

  __v: number;
}