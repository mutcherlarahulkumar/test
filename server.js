import express from "express";
import cors from "cors";

const app  = express();
const PORT = process.env.PORT || 4000;

/* ──── In‑memory DB ──── */
const db = [];                     // ← simple array

/* ──── Middleware ──── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ──── Routes ──── */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

/* 1. Store every `{ number, msg }` we receive */
app.post("/receive", (req, res) => {
  const { number, msg } = req.body;

  if (!number || !msg) {
    return res.status(400).json({ error: "`number` and `msg` are required." });
  }

  const record = {
    id: db.length + 1,             // quick incremental id
    number: String(number),
    msg: String(msg),
    ts: new Date().toISOString(),
  };

  db.push(record);                // save to array
  console.log("📨 Stored:", record);

  res.json({ saved: true, data: record });
});

/* 2. Return all messages, newest first */
app.get("/messages", (_req, res) => {
  // slice → copy; reverse → latest‑first
  res.json(db.slice().reverse());
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
