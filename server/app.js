const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
const api = require("./routes/router");
const { PORT } = require("./config/settings");
const Auth = require("./routes/authRoute");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
require("./middleware/cron"); // Cron job
const userauth = require("./routes/verifyRoute");

const app = express();
// Remove this line, as __dirname is already available
// const __dirname = __dirname;

dotenv.config();

// Middleware setup
app.use(express.json());
// app.use(cors({
//   origin: "https://ops.claimwolfgroup.com/"
// }));
app.use(
  cors()
);
app.use(express.urlencoded({ extended: false }));
// app.use(helmet());
app.use(morgan("dev"));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      // defaultSrc: ["'self'", "https://app.powerbi.com"],
      connectSrc: ["'self'", "https://ops.claimwolfgroup.com/"],
      // imgSrc: ["'self'", "data:", "https://ops.claimwolfgroup.com/"],
      // scriptSrc: ["'self'", "https://unpkg.com"],
    

      // other directives as needed
    },
  },
  // other helmet configurations if needed
}));

app.use(cors());

// app.use(rateLimit({...})) // Keep this commented if you're not using it
app.set("trust proxy", true);

app.use(
  "/upload",
  (req, res, next) => {
    res.setHeader("Content-Disposition", "inline");
    next();
  },
  express.static(path.join(__dirname, "upload"))
);

app.use("/auth", Auth);
app.use(userauth);
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
