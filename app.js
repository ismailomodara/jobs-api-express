require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// Connect DB
const connectDB = require("./db/connect");

// Routes
const auth = require("./routes/auth");
const jobs = require("./routes/jobs");

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/api/v1', (req, res) => {
  res.send('jobs api');
});

app.use("/api/v1", auth);
app.use("/api/v1", jobs);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
