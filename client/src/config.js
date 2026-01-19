// Frontend configuration using environment variables
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
};

export default config;
