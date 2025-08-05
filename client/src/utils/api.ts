// API configuration utility
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

export const apiEndpoints = {
  // Public endpoints
  profile: `${API_BASE_URL}/profile`,
  projects: `${API_BASE_URL}/projects`,
  skills: `${API_BASE_URL}/skills`,
  experience: `${API_BASE_URL}/experience`,
  testimonials: `${API_BASE_URL}/testimonials`,
  contact: `${API_BASE_URL}/contact`,

  // Admin endpoints
  admin: {
    login: {
      requestOtp: `${API_BASE_URL}/admin/login/request-otp`,
      verifyOtp: `${API_BASE_URL}/admin/login/verify-otp`,
    },
    verifyToken: `${API_BASE_URL}/admin/verify-token`,
    dashboard: {
      stats: `${API_BASE_URL}/admin/dashboard/stats`,
      connectionStatus: `${API_BASE_URL}/admin/dashboard/connection-status`,
      contactStats: `${API_BASE_URL}/admin/dashboard/contact-stats`,
    },
    profile: `${API_BASE_URL}/admin/profile`,
    projects: `${API_BASE_URL}/admin/projects`,
    skills: `${API_BASE_URL}/admin/skills`,
    experience: `${API_BASE_URL}/admin/experience`,
    testimonials: `${API_BASE_URL}/admin/testimonials`,
    contacts: `${API_BASE_URL}/admin/contacts`,
  },
};

// Helper function to build URLs with IDs
export const buildApiUrl = (baseUrl: string, id?: string | number) => {
  return id ? `${baseUrl}/${id}` : baseUrl;
};

// Helper function for query parameters
export const buildUrlWithParams = (
  baseUrl: string,
  params: Record<string, string | number | boolean>
) => {
  const url = new URL(baseUrl, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });
  return url.toString();
};
