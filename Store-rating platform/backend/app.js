const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");


require("./db");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use(
  "/api/owner",
  ownerRoutes
);



app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});