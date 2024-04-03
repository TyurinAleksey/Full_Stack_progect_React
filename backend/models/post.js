import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String, //Тип данных
        required: true, //Обязательность
    },
    text: {
        type: String, //Тип данных
        required: true, //Обязательность
        unique: true, //Уникальность
    },
    tags: {
        type: Array, //Тип данных
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //Тип данных
        ref: "User",
        required: true,
    },
    imageUrl: String,
}, {
    timestamps: true,
});

export default mongoose.model("Post", PostSchema);