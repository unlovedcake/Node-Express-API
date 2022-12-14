

const express = require("express");
const app = express();

const path = require('path');
const fileUpload = require('express-fileupload');

const programmingLanguagesRouter = require("./routes/programmingLanguages");

const port = 3000;




app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static(path.join(__dirname, 'public')));


app.use(fileUpload());

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use(programmingLanguagesRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {


    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.all('*', (req, res) => {
    res
        .status(404)
        .json({ message: "404! Page not found ", status: "404" });

});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});