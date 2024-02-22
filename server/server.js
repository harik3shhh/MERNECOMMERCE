require('dotenv').config();
const express = require("express");
const app = express();
// require("./db/conn");
const morgan = require("morgan");
const connectionDb = require("./db/conn");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/category-route");
const productRoutes = require("./routes/product-route");
const formidable = require("express-formidable");
const cors = require("cors"); 


const port = process.env.PORT;

const corsOptions={
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, HEAD, DELETE",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use(formidable());
app.use("/api/v1/product", productRoutes);


app.get("/", (req, res)=>{
    res.send("Home");
    // console.log("Home");
});


//DB connection and PORT Listening
connectionDb().then(()=>{
    //LISTENING TO PORT
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port} `);
    });
    });