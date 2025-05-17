export interface IUserDocument {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  role: string;
  isEmailOrPhoneNumberChanged: boolean;
  isPasswordChanged: boolean;
  isVerified: boolean;
  isActive: boolean;
  otp?: string;
  otpExpiresIn?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiresIn?: Date;
  lastActivityDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}