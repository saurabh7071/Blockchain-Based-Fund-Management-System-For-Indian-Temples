import { refreshAccessToken } from "@/app/utils/superadminAccessToken";

export const apiClient = async (url: string, options: RequestInit = {}) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");

        // Add the access token to the headers
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch(url, { ...options, headers });

        // If the access token is expired, refresh it
        if (response.status === 401) {
            console.warn("Access token expired. Refreshing...");
            const newAccessToken = await refreshAccessToken();

            // Retry the original request with the new access token
            const retryHeaders = {
                ...options.headers,
                Authorization: `Bearer ${newAccessToken}`,
            };

            return await fetch(url, { ...options, headers: retryHeaders });
        }

        return response;
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};