var express = require("express");
const app = express();
const cors = require("cors");
const router = require('./routes/routes');
var corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET, PUT, POST",
};
  
app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = 3000;

app.use(express.json());
app.use('/', router);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}.`);
});