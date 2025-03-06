require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors('*'));

mongoose.connect(process.env.MONGO_URI )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/transactions', require('./routes/Transactions'));
// app.use('/api/budget', require('./routes/Budget'));

app.get('/', (req, res) => {
  res.send('Hello World');
});
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

