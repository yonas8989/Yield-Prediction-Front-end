import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosConfig";

// Types
type PredictionInput = {
  name: string;
  elevation: string;
  year: string;
  precipitation: string;
  relativeHumidity: string;
  sunshineHours: string;
  temperatureMin: string;
  temperatureMax: string;
  windSpeed: string;
};

// Unique location names from the Excel data
const locationNames = [
  "Addis Ababa Bole",
  "Arba Minch",
  "Awassa",
  "Axum Air Port",
  "Bahir Dar New",
  "Combolcha",
  "Debre Markos",
  "Debre Zeit (AF)",
  "Dire Dawa",
  "Gode Met",
  "Gondar A.P.",
  "Gore",
  "Jimma",
  "Mekele Air Port Obse",
  "Metehara (NMSA)",
  "Neghele",
  "Nekemte",
  "Robe",
];

const NewPrediction = () => {
  const [newPrediction, setNewPrediction] = useState<PredictionInput>({
    name: "",
    elevation: "",
    year: "",
    precipitation: "",
    relativeHumidity: "",
    sunshineHours: "",
    temperatureMin: "",
    temperatureMax: "",
    windSpeed: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNewPredictionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    // Prepare payload
    const payload = {
      name: newPrediction.name,
      elevation: parseFloat(newPrediction.elevation),
      year: parseInt(newPrediction.year),
      precipitation: parseFloat(newPrediction.precipitation),
      relativeHumidity: parseFloat(newPrediction.relativeHumidity),
      sunshineHours: parseFloat(newPrediction.sunshineHours),
      temperatureMin: parseFloat(newPrediction.temperatureMin),
      temperatureMax: parseFloat(newPrediction.temperatureMax),
      windSpeed: parseFloat(newPrediction.windSpeed),
    };

    // Validate payload
    if (
      !payload.name ||
      isNaN(payload.elevation) ||
      isNaN(payload.year) ||
      isNaN(payload.precipitation) ||
      isNaN(payload.relativeHumidity) ||
      isNaN(payload.sunshineHours) ||
      isNaN(payload.temperatureMin) ||
      isNaN(payload.temperatureMax) ||
      isNaN(payload.windSpeed) ||
      payload.relativeHumidity < 0 ||
      payload.relativeHumidity > 100 ||
      payload.precipitation < 0 ||
      payload.sunshineHours < 0 ||
      payload.windSpeed < 0 ||
      payload.year < 1900
    ) {
      setError(
        "Please fill in all fields with valid values. Ensure numbers are valid, humidity is 0-100%, and year is at least 1900."
      );
      setIsSubmitting(false);
      return;
    }

    // Log payload for debugging
    console.log("Sending payload:", payload);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to make a prediction. Please log in.");
        setIsSubmitting(false);
        return;
      }

      // Make API call with Authorization header
      const response = await apiClient.post(
        "/api/v1/yields/predict",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Prediction response:", response.data);

      // Display success message
      setSuccessMessage(response.data.message || "Prediction created successfully!");

      // Reset form
      setNewPrediction({
        name: "",
        elevation: "",
        year: "",
        precipitation: "",
        relativeHumidity: "",
        sunshineHours: "",
        temperatureMin: "",
        temperatureMax: "",
        windSpeed: "",
      });

      // Redirect to /past-predictions after 2 seconds
      setTimeout(() => {
        navigate("/past-predictions");
      }, 2000);
    } catch (err: any) {
      console.error("Error submitting prediction:", err);
      let errorMessage = "Failed to submit prediction. Please try again.";
      if (err.response?.status === 401 || err.response?.data?.message?.toLowerCase().includes("login")) {
        errorMessage = "You must be logged in to make a prediction. Please log in.";
      } else if (err.response?.data?.message || err.response?.data?.error) {
        errorMessage = err.response.data.message || err.response.data.error;
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-[#dad7cd]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#344e41]">🎯 New Prediction</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-[#a3b18a] text-[#344e41] rounded-lg">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleNewPredictionSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Location Name</label>
              <select
                value={newPrediction.name}
                onChange={(e) => setNewPrediction({ ...newPrediction, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              >
                <option value="">Select Location</option>
                {locationNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Elevation (m)</label>
              <input
                type="number"
                min="0"
                value={newPrediction.elevation}
                onChange={(e) => setNewPrediction({ ...newPrediction, elevation: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Year</label>
              <input
                type="number"
                min="1900"
                value={newPrediction.year}
                onChange={(e) => setNewPrediction({ ...newPrediction, year: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Precipitation (mm)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={newPrediction.precipitation}
                onChange={(e) => setNewPrediction({ ...newPrediction, precipitation: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Relative Humidity (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={newPrediction.relativeHumidity}
                onChange={(e) => setNewPrediction({ ...newPrediction, relativeHumidity: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Sunshine Hours (hrs)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={newPrediction.sunshineHours}
                onChange={(e) => setNewPrediction({ ...newPrediction, sunshineHours: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Min Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                value={newPrediction.temperatureMin}
                onChange={(e) => setNewPrediction({ ...newPrediction, temperatureMin: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Max Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                value={newPrediction.temperatureMax}
                onChange={(e) => setNewPrediction({ ...newPrediction, temperatureMax: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344e41]">Wind Speed (km/h)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={newPrediction.windSpeed}
                onChange={(e) => setNewPrediction({ ...newPrediction, windSpeed: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#a3b18a] shadow-sm focus:border-[#588157] focus:ring-[#588157]"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-[#3a5a40] text-white px-6 py-2 rounded-lg hover:bg-[#344e41] transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Predict Yield"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPrediction;