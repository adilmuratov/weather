const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const userHistoryRouter = require("./routes/user.history.routes");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
app.use((req, res, next) => {
    //TO DO check cookie
    return next();
});

app.use("/api", userHistoryRouter);

app.listen(PORT, () => console.log(`server started on post ${PORT}`));