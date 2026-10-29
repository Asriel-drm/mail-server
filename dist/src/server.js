import 'dotenv/config';
import express from 'express';
import cors from "cors";
import router from "../routes/contact.js";
import helmet from "helmet";
const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, methods: ["POST"] }));
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use("/api", router);
const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
