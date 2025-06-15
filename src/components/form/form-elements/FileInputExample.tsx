import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";
import apiClient from "../../../api/axiosConfig";
const FileInputExample: FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validFileTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!validFileTypes.includes(file.type)) {
      setToastMessage("Error: Please upload a valid CSV or Excel file (.csv, .xlsx, .xls).");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsLoading(true);
    setToastMessage(null);

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setToastMessage("You must be logged in to upload a file. Please log in.");
      setIsLoading(false);
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    // Prepare file for upload
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make API call with Authorization header
      const response = await apiClient.post("/api/v1/yields/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Display success message
      setToastMessage(response.data.message || "File uploaded and processed successfully!");
    } catch (err: any) {
      console.error("Error uploading file:", err);
      let errorMessage = "Failed to upload file. Please try again.";
      if (err.response?.status === 401 || err.response?.data?.message?.toLowerCase().includes("login")) {
        errorMessage = "You must be logged in to upload a file. Please log in.";
      } else if (err.response?.data?.message || err.response?.data?.error) {
        errorMessage = err.response.data.message || err.response.data.error;
      }
      setToastMessage(errorMessage);
    } finally {
      setIsLoading(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="p-6 bg-[#dad7cd]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <ComponentCard title="File Input">
          <div className="relative">
            {toastMessage && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  toastMessage.includes("Error") || toastMessage.includes("Failed") || toastMessage.includes("login")
                    ? "bg-red-100 text-red-700"
                    : "bg-[#a3b18a] text-[#344e41]"
                }`}
              >
                {toastMessage}
              </div>
            )}
            {isLoading && (
              <div className="mb-4 p-3 bg-[#a3b18a] text-[#344e41] rounded-lg">
                Processing file...
              </div>
            )}
            <Label>Upload file</Label>
            <FileInput
              onChange={handleFileChange}
              className="custom-class mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
              accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              disabled={isLoading}
            />
          </div>
        </ComponentCard>
      </div>
    </div>
  );
};

export default FileInputExample;