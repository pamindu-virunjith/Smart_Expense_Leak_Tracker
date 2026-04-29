import mongoose, { set } from "mongoose";

const expenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
        default: "N/A",
        set: (value) => value === "" ? "N/A" : value
    },
    date: {
        type: Date,
        required: true,
    },
},
{
    timestamps: true,
});

export default mongoose.model("expense", expenseSchema);