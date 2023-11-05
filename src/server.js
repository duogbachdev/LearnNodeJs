import app from "./app.js";
import connectDB from "./config/db.js";

// Define Port
const serverPort = 3000


// Connect Database

connectDB();

// Listen Port
const server = app.listen(serverPort, () => {
  console.log(`Server listening on port: ${serverPort}`)
})

const exitHanlder = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  console.error(error)
  exitHanlder()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.log('SIGTERM received')
  if (server) {
    server.close()
  }
})