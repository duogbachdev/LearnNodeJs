import mongoose from 'mongoose'

// Connect Database
const connectDB = async () => {
  const DB = "mongodb://localhost:27017"

  mongoose.set('autoIndex', true)

  const con = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })

  console.log(`MongoDB Connected: ${con.connection.host}`)

  mongoose.connection.on('Connecying', () => {
    console.info('Connecting to Database')
  })
  mongoose.connection.on('Connected', () => {
    console.info('Connected to Database')
  })
  mongoose.connection.on('Error', (error) => {
    console.error(error.message)
  })
  mongoose.connection.on('Disconnected', () => {
    console.info('Disconnected to Database')
  })


  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })
}

export default connectDB