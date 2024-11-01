require("./config/connectDB.js");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const { setupWebSocket } = require("./services/setupWebSocket");

const product = require("./routes/product");
const review = require("./routes/review");
const order = require("./routes/order");
const faq = require("./routes/faq");
const graph = require("./routes/graph.js");
const ai = require("./routes/ai.js");
const auth = require("./routes/auth");

const PORT = 8080;
const app = express();

// app.use(
//   cors({
//     origin: [
//       "https://localhost:5173",
//       "https://crop-connect-lime.vercel.app",
//       "https://crop-connect-nine.vercel.app",
//       "https: //crop-connect-nine.vercel.app/",
//       "https://crop-connect-kxls-bife1sgln-saurabh007007s-projects.vercel.app",
//       "https://crop-connect-api.vercel.app",
//     ],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Note: Changed https to http for localhost
      "https://crop-connect-lime.vercel.app",
      "https://crop-connect-nine.vercel.app",
      "https://crop-connect-kxls-bife1sgln-saurabh007007s-projects.vercel.app",
      "https://crop-connect-api.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 600, // Cache preflight requests for 10 minutes
  })
);

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

setupWebSocket(io);

// Health Check
app.get("/", (req, res) => {
  res.send("CropConnect Server is running");
});

// Routes
app.use("/auth", auth);
app.use("/products", product);
app.use("/reviews", review);
app.use("/order", order);
app.use("/faqs", faq);
app.use("/graph", graph);
app.use("/ai", ai);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
