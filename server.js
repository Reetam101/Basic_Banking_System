const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/', require('./routes/transaction'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
})