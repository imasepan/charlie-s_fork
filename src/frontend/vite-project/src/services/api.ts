/*

file used to interact with the backend api and fetch data from the server. 

*/

import axios from 'axios';
const API_BASE = 'http://3.84.115.237:9999'; // Corrected the API base URL

// /packages (POST)
export async function postPackage(id: string) {
  const response = await axios.post(`${API_BASE}/packages`); // Fixed to POST
  return response // just response for now.
}

// /packages/:id (GET)
export async function fetchPackageById(id: string) {
  const response = await axios.get(`${API_BASE}/packages/${id}`); // Correct method
  return response // just response for now.
}

// /packages/:id (PUT)
export async function updatePackageById(id: string) {
  const response = await axios.put(`${API_BASE}/packages/${id}`); // Fixed to PUT
  return response // just response for now.
}

// /packages/:id (DELETE)
export async function deletePackageById(id: string) {
  const response = await axios.delete(`${API_BASE}/packages/${id}`); // Fixed to DELETE
  return response // just response for now.
}

// /packages/:id/rate (GET)
export async function ratePackage(id: string) {
  const response = await axios.get(`${API_BASE}/packages/${id}/rate`); // Corrected endpoint
  return response // just response for now.
}

// /packages/:id/cost (GET)
export async function fetchPackageCost(id: string) {
  const response = await axios.get(`${API_BASE}/packages/${id}/cost`); // Correct method
  return response // just response for now.
}

// /reset (DELETE)
export async function resetSystem() {
  const response = await axios.delete(`${API_BASE}/reset`); // Fixed to DELETE
  return response // just response for now.
}

// /packages/byRegEx (POST)
export async function byRegex(regex: string) {
  try {
    const response = await axios.post(
      `${API_BASE}/packages/byRegEx`,
      { RegEx: regex }, // Payload
      {
        headers: {
          'Content-Type': 'application/json', // Content-Type header
        },
      }
    );
    return response.data; // Return only the data if that's what you need
  } catch (error) {
    console.error('Error while fetching packages by regex:', error);
    throw error; // Re-throw the error to handle it upstream
  }
}


// /packages (POST)
export async function listPackages(packages: string[]) {
  const response = await axios.post(`${API_BASE}/packages`, { packages }); // Fixed to POST
  return response // just response for now.
}
