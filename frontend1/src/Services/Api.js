import axios from 'axios'

const API_URL = "http://localhost:5000/api/blogs"

export const signUpUser = async (name, username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name, username, password
        });
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("SignUp error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'SignUp Failed');
    }
}

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });

        console.log("Login Response:", response.data);

        if (response.data && response.data.token && response.data.token.accessToken && response.data.user) {
            localStorage.setItem("token", JSON.stringify(response.data.token.accessToken));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("isAuthenticated", "true");

            // console.log("access token", response.data.token.accessToken);
            console.log("Token and user stored successfully.");
        } else {
            console.error("Missing token or user in response:", response.data);
        }

        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
    }
};


export const logoutUser = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No valid token found");
        }

        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200 && response.data.success) {
            return { success: true, message: "Logout successful" };
        } else {
            throw new Error(response.data.message || "Unexpected logout response");
        }
    } catch (error) {
        console.error("Logout error:", error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || "Logout failed" };
    }
};


export const createBlog = async (formData, token) => {
    try {
        const response = await axios.post(`${API_URL}/createblog`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

      return response.data
    } catch (error) {
        console.error("Error in uploading blog", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to upload blog");
    }
};
