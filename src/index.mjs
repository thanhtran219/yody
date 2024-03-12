import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { getConnection } from "./app/config/database.mjs";
import { errorHandler, notFoundMiddleware } from "./middleware/error-handler.mjs";
import categoryRoute from "./routes/category.route.mjs";
import productRoute from "./routes/product.route.mjs";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const HOST_NAME = process.env.HOST_NAME;

app.use(bodyParser.json());

// Connecting to database middleware
app.use(getConnection);

app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);

// 404 Middleware (Not Found)
app.use(notFoundMiddleware);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server's running on http://${HOST_NAME}:${PORT}`);
})