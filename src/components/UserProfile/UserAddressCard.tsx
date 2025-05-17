import { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import apiClient from "../../api/axiosConfig";
import { IUserDocument } from "../../types/user";

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [user, setUser] = useState<IUserDocument | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        email: parsedUser.email || "",
        phoneNumber: parsedUser.phoneNumber || "",
      });
    } else {
      setError("No user data found. Please log in.");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    // Validation
    if (!formData.email || !formData.phoneNumber) {
      setError("Email and phone number are required.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to update your profile.");
        setLoading(false);
        return;
      }

      const response = await apiClient.patch(
        "/api/v1/user/update",
        {
          email: formData.email,
          phoneNumber: formData.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update localStorage and state
      const updatedUser = response.data.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setFormData({
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
      });
      closeModal();
    } catch (err: any) {
      let errorMessage = "Failed to update profile. Please try again.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-5 border border-[#a3b18a] rounded-2xl bg-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-[#344e41] lg:mb-6">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
              <div>
                <p className="mb-2 text-xs text-[#344e41]">Email Address</p>
                <p className="text-sm font-medium text-[#344e41]">
                  {user?.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs text-[#344e41]">Phone Number</p>
                <p className="text-sm font-medium text-[#344e41]">
                  {user?.phoneNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#a3b18a] bg-white px-4 py-3 text-sm font-medium text-[#344e41] hover:bg-[#dad7cd] hover:text-[#344e41] lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white rounded-3xl">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-[#344e41]">
              Edit Contact Information
            </h4>
            <p className="mb-6 text-sm text-[#344e41]">
              Update your contact details to keep your profile up-to-date.
            </p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}
                disabled={loading}
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={loading}
                className="bg-[#3a5a40] text-white hover:bg-[#344e41]"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}