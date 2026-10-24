import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

export const foodTruckService = {
  // Check backend service health
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/');
      return { online: true, message: response.data };
    } catch (error) {
      return { 
        online: false, 
        message: error.message || 'Cannot connect to backend server' 
      };
    }
  },

  // Get all food trucks
  getAllFoodTrucks: async () => {
    try {
      const response = await apiClient.get('/displayall');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch food trucks');
    }
  },

  // Get single food truck by ID
  getFoodTruckById: async (id) => {
    try {
      const response = await apiClient.get(`/get/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, `Failed to fetch food truck #${id}`);
    }
  },

  // Add new food truck (no ID submitted)
  addFoodTruck: async (truckData) => {
    try {
      // Guarantee ID is NOT sent
      const payload = {
        truckName: truckData.truckName.trim(),
        cuisine: truckData.cuisine.trim(),
        dailySales: parseFloat(truckData.dailySales),
        operating: Boolean(truckData.operating),
      };

      const response = await apiClient.post('/add', payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to create food truck');
    }
  },

  // Update existing food truck
  updateFoodTruck: async (id, truckData) => {
    try {
      const payload = {
        truckName: truckData.truckName.trim(),
        cuisine: truckData.cuisine.trim(),
        dailySales: parseFloat(truckData.dailySales),
        operating: Boolean(truckData.operating),
      };

      const response = await apiClient.put(`/update/${id}`, payload);
      return response.data;
    } catch (error) {
      throw handleApiError(error, `Failed to update food truck #${id}`);
    }
  },

  // Delete food truck by ID
  deleteFoodTruck: async (id) => {
    try {
      const response = await apiClient.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, `Failed to delete food truck #${id}`);
    }
  },
};

// Formats API errors into user-friendly messages
function handleApiError(error, defaultMsg) {
  if (error.response) {
    // Backend returned HTTP error
    const status = error.response.status;
    const data = error.response.data;

    let message = defaultMsg;
    let fieldErrors = null;

    if (data && typeof data === 'object') {
      if (data.message) {
        message = data.message;
      }
      if (data.errors) {
        fieldErrors = data.errors;
      }
    } else if (typeof data === 'string') {
      message = data;
    }

    const err = new Error(message);
    err.status = status;
    err.fieldErrors = fieldErrors;
    return err;
  } else if (error.request) {
    // Network / connection issue
    const err = new Error(
      'Unable to connect to the backend server at http://localhost:8081. Ensure the Spring Boot service is running.'
    );
    err.status = 0;
    return err;
  } else {
    return new Error(error.message || defaultMsg);
  }
}
