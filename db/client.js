// import mongoose
import mongoose from 'mongoose';

// connect mongoose with databse
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected");
} catch (error) {
    console.log(error)
}