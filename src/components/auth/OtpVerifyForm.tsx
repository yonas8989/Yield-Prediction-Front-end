import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import apiClient from "../../api/axiosConfig";

export default function OtpVerifyForm() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data from location state or localStorage
  const userData =
    location.state?.user ||
    JSON.parse(localStorage.getItem("tempUser") || "null");
  const userId = userData?._id;

  useEffect(() => {
    // Countdown timer for resend OTP
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!otp || otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.patch(
        `/api/v1/user/${userId}/verifyotp`,
        { otp }
      );

      // Handle successful verification
      localStorage.removeItem("tempUser");
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      localStorage.setItem("token", response.data.token || "");

      navigate("/", {
        state: { fromVerification: true },
      });
    } catch (err: any) {
      let errorMessage = "Verification failed. Please try again.";

      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Invalid OTP";
        } else if (err.response.status === 410) {
          errorMessage = "OTP has expired. Please request a new one.";
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendDisabled(true);
      setCountdown(60);
      setError(null);
  
      // Get the token from localStorage or wherever you store it
      const token = localStorage.getItem("token");
      
      if (!userId) {
        throw new Error("User ID not found");
      }
      if (!token) {
        throw new Error("Authentication token missing");
      }
  
      const response = await apiClient.patch(
        `/api/v1/user/${userId}/requestotp`,
        {}, // Empty body since your endpoint doesn't need one
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // JWT token
          }
        }
      );
  
      if (response.data?.status === "SUCCESS") {
        setError("New OTP sent successfully! Please check your email or phone.");
      } else {
        throw new Error(response.data?.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      console.error("OTP Resend Error:", err);
      
      let errorMessage = "Failed to resend OTP. Please try again.";
      
      if (err.response) {
        // Handle specific HTTP error codes
        if (err.response.status === 401) {
          errorMessage = "Session expired. Please sign in again.";
        } else if (err.response.status === 404) {
          errorMessage = "User not found";
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      // Reset the resend button if countdown completes
      if (countdown <= 0) {
        setResendDisabled(false);
      }
    }
  };

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
          Verification Error
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          No user data found. Please complete the signup process first.
        </p>
        <Link
          to="/signup"
          className="mt-4 text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Go to Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/signup"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to sign up
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Verify Your Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the 4-digit OTP sent to{" "}
              {userData?.email || userData?.phoneNumber}
            </p>
          </div>

          {error && (
            <div
              className={`p-3 mb-4 text-sm rounded-lg ${
                error.includes("success")
                  ? "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-100"
                  : "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-100"
              }`}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  OTP Code <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setOtp(value);
                  }}
                  placeholder="Enter 4-digit OTP"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Didn't receive code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendDisabled}
                    className={`text-sm ${
                      resendDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    }`}
                  >
                    {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
                  </button>
                </p>
              </div>

              <div>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={loading || !otp || otp.length !== 4}
                >
                  {loading ? "Verifying..." : "Verify Account"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
