const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const receptionistRoutes = require("./routes/receptionistRoutes");
const touristRoutes = require("./routes/touristRoutes");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/receptionist", receptionistRoutes);
app.use("/tourist", touristRoutes);


module.exports = app;