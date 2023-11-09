import mongoose from 'mongoose';

// connect database
const connectDB = async () => {
  const DB = "mongodb://localhost:27017";

  mongoose.set('autoIndex', true);

  const con = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })

  console.log(`Mongodb Connected: ${con.connection.host}`);

  mongoose.connection.on('connecting', () => {
    console.info('Connecting to Database');
  });

  mongoose.connection.on('connected', () => {
    console.info('Connected to Database');
  });

  mongoose.connection.on('error', (err) => {
    console.error(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.info('Connection is disconnected');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default connectDB;
