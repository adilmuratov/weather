const express = require("express");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("./routes/auth.routes");
const userHistoryRouter = require("./routes/user.history.routes");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));
app.use("/api", authRouter);

app.use("/api", userHistoryRouter);

app.listen(PORT, () => console.log(`server started on post ${PORT}`));