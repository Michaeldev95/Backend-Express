import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan"; // logging middleware
import { title } from "process";
import path from "path";


const app = express()
const port = 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

// Set EJS as the view engine
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));

function logger(req, res, next) {
    console.log("Req method", req.method)



    next();
};
app.use(logger)

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {

    const data = {
        title: "Home Page - Welcome to My Site",

    }
    console.log(data)
    res.render("main.ejs", { data: data })
})




app.post('/submit', (req, res) => {
    const code = req.body["code"];

    console.log(req.body["code"])
    const data = {
        code: code
    }

    res.render("main.ejs", { data })


})

app.get('/about', (req, res) => {
    const data = {}
    res.render("about.ejs", { data: data })
})
app.get('/contact', (req, res) => {
    const data = {}
    res.render("contact.ejs", { data: data })
})



app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
})
