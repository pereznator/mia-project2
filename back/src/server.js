const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const receptionistRoutes = require("./routes/receptionistRoutes");
const touristRoutes = require("./routes/touristRoutes");
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripsRoutes");
const carsRoutes = require("./routes/carsRoutes");
const createAdminUser = require('./utils/createAdminUser');
const resetData = require('./utils/resetData');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/receptionist", receptionistRoutes);
app.use("/tourist", touristRoutes);
app.use("/trips", tripRoutes);
app.use("/cars", carsRoutes);

//resetData()
//createAdminUser();

module.exports = app;