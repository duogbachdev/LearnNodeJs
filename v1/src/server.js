import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

const serverPort = 3000; // Define port

// connect database
connectDB();

// Listen port
const server = app.listen(serverPort, () => {
  logger.info(`
    #########################################
     Server listening on port: ${serverPort}
    #########################################
  `)
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
