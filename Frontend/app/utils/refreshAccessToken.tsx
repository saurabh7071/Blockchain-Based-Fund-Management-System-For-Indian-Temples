export const refreshAccessToken = async (endpoint: string) => {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: "include", // Include cookies in the request
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: localStorage.getItem("refreshToken"), // Use the refresh token from localStorage
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to refresh access token");
        }

        const result = await response.json();

        if (result.success) {
            // Store the new access token and refresh token
            sessionStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("refreshToken", result.data.refreshToken);
            return result.data.accessToken;
        } else {
            throw new Error(result.message || "Failed to refresh access token");
        }
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};