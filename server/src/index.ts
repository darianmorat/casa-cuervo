import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";
import activityRoute from "./routes/activity.route";
import artworkRoute from "./routes/artwork.route";
import portfolioRoute from "./routes/portfolio.route";
import assetRoute from "./routes/asset.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
   }),
);

app.use("/auth", authRoute);
app.use("/activity", activityRoute);
app.use("/artwork", artworkRoute);
app.use("/portfolio", portfolioRoute);
app.use("/asset", assetRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`listening in port: ${PORT}`);
});
