const express = require("express");
const app = express();
const dotenv= require('dotenv');
const authRoutes = require("./routes/authRoute");
const dbConnect = require("./config/dbConnect");
const eventRoutes = require("./routes/eventRoute");
const ticketRoutes = require("./routes/ticketRoute")
dotenv.config({});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/ticket", ticketRoutes);

const PORT =  process.env.PORT || 5000;

app.listen(PORT, async ()=>{
    console.log(`server is listening at port ${PORT}`)
    dbConnect();
})

