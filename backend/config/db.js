import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://test:resume123@resumebuilder.rqtpgjw.mongodb.net/Resume')
    .then(() => console.log('DB CONNECTED'));
};

export default connectDB;

