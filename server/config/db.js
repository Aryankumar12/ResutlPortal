const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, { 
        });

        console.log('MONGODB CONNECTION SUCCESS')
        

    }catch(err){
        console.error('MONGODB CONNECTION FAILED', err.message)
        process.exit(1)
    }
}


module.exports = connectDB