import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GridIcon, CalenderIcon } from "../../icons";
import apiClient from "../../api/axiosConfig";

// Types
type Prediction = {
  id: string;
  userId: string;
  name: string;
  elevation: number;
  year: number;
  precipitation: number;
  relativeHumidity: number;
  sunshineHours: number;
  temperatureMin: number;
  temperatureMax: number;
  windSpeed: number;
  predictedYield: number;
  predictionDate: string;
  createdAt: string;
  updatedAt: string;
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

const PastPrediction = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch predictions on mount
  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view predictions. Please log in.");
          setIsLoading(false);
          return;
        }

        const response = await apiClient.get("/api/v1/yields/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const history = response.data.data.history || [];
        // Map API response to Prediction type
        const formattedPredictions: Prediction[] = history.map((item: any) => ({
          id: item._id,
          userId: item.userId,
          name: item.name,
          elevation: item.elevation,
          year: item.year,
          precipitation: item.precipitation,
          relativeHumidity: item.relativeHumidity,
          sunshineHours: item.sunshineHours,
          temperatureMin: item.temperatureMin,
          temperatureMax: item.temperatureMax,
          windSpeed: item.windSpeed,
          predictedYield: item.predictedYield,
          predictionDate: new Date(item.predictionDate).toLocaleDateString(),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));

        setPredictions(formattedPredictions);
      } catch (err: any) {
        console.error("Error fetching predictions:", err);
        let errorMessage = "Failed to load predictions. Please try again.";
        if (err.response?.status === 401 || err.response?.data?.message?.toLowerCase().includes("login")) {
          errorMessage = "You must be logged in to view predictions. Please log in.";
        } else if (err.response?.data?.message || err.response?.data?.error) {
          errorMessage = err.response.data.message || err.response.data.error;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter predictions based on search term and location
  const filteredPredictions = predictions.filter((prediction) => {
    const matchesSearch =
      prediction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prediction.year.toString().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? prediction.name.toLowerCase() === selectedLocation.toLowerCase() : true;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="p-6 bg-[#dad7cd]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#344e41]">🌾 Past Predictions</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-[#a3b18a]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#344e41]">
                <GridIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by location or year..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-[#a3b18a] focus:outline-none focus:ring-2 focus:ring-[#588157] focus:border-[#588157]"
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg border border-[#a3b18a] focus:outline-none focus:ring-2 focus:ring-[#588157] focus:border-[#588157]"
                disabled={isLoading}
              >
                <option value="">All Locations</option>
                {locationNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6 text-center text-[#344e41]">Loading predictions...</div>
          ) : filteredPredictions.length === 0 ? (
            <div className="p-6 text-center text-[#344e41]">No predictions found.</div>
          ) : (
            <table className="min-w-full divide-y divide-[#a3b18a]">
              <thead className="bg-[#dad7cd]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    <div className="flex items-center">
                      <CalenderIcon className="w-4 h-4 mr-2" />
                      Date
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Elevation (m)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Precipitation (mm)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Humidity (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Sunshine Hours (hrs)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Min Temp (°C)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Max Temp (°C)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Wind Speed (km/h)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Predicted Yield (q/ha)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#344e41] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#a3b18a]">
                {filteredPredictions.map((prediction) => (
                  <tr key={prediction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.predictionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.elevation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.precipitation.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.relativeHumidity.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.sunshineHours.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.temperatureMin.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.temperatureMax.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.windSpeed.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      {prediction.predictedYield}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#344e41]">
                      <button
                        onClick={() => navigate(`/predictions/${prediction.id}`)}
                        className="bg-[#3a5a40] text-white px-4 py-1 rounded-lg hover:bg-[#344e41] transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastPrediction;