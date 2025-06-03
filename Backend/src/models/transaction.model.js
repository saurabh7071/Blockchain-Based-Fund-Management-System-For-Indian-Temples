import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: ['transfer', 'temple-registration', 'withdrawal'],
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    txHash: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'failed'],
        default: 'pending',
    },
    gasPrice: {
        type: String, 
        required: true,
    },
    transactionFee: {
        type: String, 
        required: true
    },
    purpose: {
        type: String,
    }
}, {
    timestamps: true,
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
