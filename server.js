import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Enable CORS for all routes and origins
app.use(express.json()); // Handle application/json
app.use(express.urlencoded({ extended: true })); // Handle application/x-www-form-urlencoded

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

app.post("/receive", (req, res) => {
  console.log("📨 Received:", req.body); // Print to console
  res.json({ received: true, data: req.body });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
