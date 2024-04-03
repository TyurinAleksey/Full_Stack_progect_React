import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String, //Тип данных
        required: true, //Обязательность
    },
    email: {
        type: String, //Тип данных
        required: true, //Обязательность
        unique: true, //Уникальность
    },
    passwordHash: {
        type: String, //Тип данных
        required: true, //Обязательность
    },
    avatarUrl: String,
}, {
    timestamps: true,
});

export default mongoose.model("User", UserSchema);