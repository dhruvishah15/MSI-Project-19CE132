var express = require("express");
var app = express();
const cors = require("cors");
const router = require('./routes/routes');
var corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST",
};
  
app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = 3000;
// Fnctn 1 and 2. If 1=> before 2 then 1 is called a middleware
app.use(express.json());
app.use('/', router);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}.`);
});