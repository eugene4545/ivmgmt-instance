import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import { PrismaClient } from "@prisma/client";

/* ROUTE IMPORTS*/

/* CONFIGURATIONS */
dotenv.config();
const app = express();
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:45701@localhost:5432/inventorymangement?schema=public";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/dashboard", dashboardRoutes); // http://localhost:8000/dashboard
app.use("/products", productRoutes);  // http://localhost:8000/products
app.use("/users", userRoutes);  // http://localhost:8000/users
app.use("/expenses", expenseRoutes);  // http://localhost:8000/expenses

/* SERVER */
const port = Number(process.env.PORT) || 3001;   //config for ec2 instance
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

/* *ROOT ROUTE* */
app.get("/", (req, res) => {
  res.send("Server is running!");
});


console.log("Environment Variables Loaded:");
console.log("DATABASE_URL:", process.env.DATABASE_URL);

