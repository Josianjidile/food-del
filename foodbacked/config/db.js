import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose.connect(
      'mongodb+srv://josia:josia@cluster0.etvmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB CONNECTED")); 
    }
     
    
  
  

