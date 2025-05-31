import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const countUsers = asyncHandler(async (req, res) => {
    try {
        const userCount = await User.countDocuments({ role: "user" }); // Count only users with the "user" role
        return res.status(200).json(
            new ApiResponse(200, { userCount }, "User count fetched successfully.")
        );
    } catch (error) {
        console.error("Error fetching user count:", error);
        throw new ApiError(500, "Failed to fetch user count.");
    }
});

const countTempleAdmins = asyncHandler(async (req, res) => {
    try {
        const verifiedCount = await User.countDocuments({ role: "templeAdmin", status: "active" });
        const pendingCount = await User.countDocuments({ role: "templeAdmin", status: "pending" });

        return res.status(200).json(
            new ApiResponse(200, { verifiedCount, pendingCount }, "Temple admin counts fetched successfully.")
        );
    } catch (error) {
        console.error("Error fetching temple admin counts:", error);
        throw new ApiError(500, "Failed to fetch temple admin counts.");
    }
});

export { 
    countUsers,
    countTempleAdmins 
};