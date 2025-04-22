import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const databaseName = "Laaagi";
        // await mongoose.connect("mongodb://localhost:27017/Laagi" ,
        await mongoose.connect(`mongodb+srv://php2dbvertex:wFis3rlkFHnJiC6E@laaagi.7ci9ixg.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Laaagi`,
             {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }
    )
        console.log("database connected")
    } catch (error) {
        console.log(`Error ${error.message}`)
    }

}

export default connectDb;

