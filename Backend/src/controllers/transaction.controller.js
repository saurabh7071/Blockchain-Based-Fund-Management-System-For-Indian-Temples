import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";

// ✅ Create a transaction: supports transfer / withdrawal / registration
const createTransaction = asyncHandler(async (req, res) => {
  const {
    transactionType,
    amount,
    txHash,
    gasPrice,
    transactionFee,
    purpose,
    status,
    receiverId, // only required for transfer and registration
  } = req.body;

  // Common validations
  if (!transactionType || !txHash || !gasPrice || !transactionFee || !status) {
    throw new ApiError(400, "Required fields are missing");
  }

  const validTypes = ["transfer", "withdrawal", "temple-registration"];
  if (!validTypes.includes(transactionType)) {
    throw new ApiError(400, "Invalid transactionType");
  }

  const validStatuses = ["pending", "confirmed", "failed"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const sender = req.user;
  if (!sender || !sender._id) {
    throw new ApiError(401, "Unauthorized: Sender not authenticated");
  }

  // Check for duplicate txHash
  const existingTx = await Transaction.findOne({ txHash });
  if (existingTx) {
    throw new ApiError(400, "Transaction with this hash already exists");
  }

  // Dynamic field validation based on transaction type
  let receiver = null;

  if (
    transactionType === "transfer" ||
    transactionType === "temple-registration"
  ) {
    if (!receiverId) throw new ApiError(400, "receiverId is required");

    receiver = await User.findById(receiverId);
    if (!receiver || receiver.status !== "active") {
      throw new ApiError(404, "Receiver not found or inactive");
    }
  }

  if (transactionType === "transfer" || transactionType === "withdrawal") {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      throw new ApiError(400, "Invalid donation amount");
    }

    if (!purpose || typeof purpose !== "string" || purpose.trim() === "") {
      throw new ApiError(400, "Purpose is required");
    }
  }

  const transaction = await Transaction.create({
    transactionType,
    sender: sender._id,
    receiver: receiver?._id || null,
    amount: transactionType === "temple-registration" ? 0 : amount,
    txHash,
    gasPrice,
    transactionFee,
    status,
    purpose: transactionType === "temple-registration" ? "" : purpose,
    cryptoType, // Assuming Ethereum for now, can be dynamic later
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, transaction, "Transaction recorded successfully")
    );
});

// ✅ Donation History (only for transfers made by user)
const donationHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "User ID not found");
  }

  const donations = await Transaction.find({
    sender: userId,
    transactionType: "transfer",
  })
    .populate({
      path: "receiver",
      select: "templeName templeLocation",
    })
    .populate({
      path: "sender",
      select: "name walletAddress",
    })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, donations, "Donation history fetched successfully")
    );
});

// ✅ Get transaction by txHash (for receipt page)
const getTransactionByTxHash = asyncHandler(async (req, res) => {
  const { txHash } = req.query;

  if (!txHash) {
    throw new ApiError(400, "Transaction hash is required");
  }

  const transaction = await Transaction.findOne({ txHash })
    .populate({
      path: "sender",
      select: "name walletAddress", // ✅ changed fullName → name
    })
    .populate({
      path: "receiver",
      select: "templeName templeLocation walletAddress", // ✅ keep only necessary fields
    });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transaction,
        "Transaction details fetched successfully"
      )
    );
});

export { createTransaction, donationHistory, getTransactionByTxHash };
