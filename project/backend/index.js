var express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const client = require("./database/db");
var alert = require("alert");
var Json2csvParser = require('json2csv').Parser;
const Projectmanagementcontroller = require('./controllers/projectManagementController');
const projectmanagementcontroller = new Projectmanagementcontroller();
const router = require('./routes/routes');
var corsOptions = {
    origin: "http://localhost:4200",
    methods: "GET, PUT, POST, DELETE",
};
  
app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = 3000;
app.use(express.static(__dirname));
app.use(express.json());
app.use('/', router);


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

app.get('/export',function(req,resp){
  client.query("SELECT * FROM projects", function (err, res, fields) {
    if (err) throw err;
    console.log("projects:");
      
    const jsonProjects = JSON.parse(JSON.stringify(res.rows));
    console.log(jsonProjects);
  
    // Convert JSON to CSV data
    const csvFields =  ['id','projectname', 'deptcode', 'users','product','status','updatedat', 'createdat','cieareaid','financeproductid'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(jsonProjects);
  
    console.log(csv);
      
    fs.writeFile('projectDetails'+ '-' + Date.now() + '.csv', csv, function(error) {
        if (error) throw error;
        console.log("Written to csv successfully!");
    });

    resp.status(200).send({message: "Project data exported successfully!"});

    // Check 'csv' file in root project folder
  });
});

app.post('/upload', upload.single('projectData'), (req, res) =>{
  projectmanagementcontroller.UploadCsvDataToPSQL(__dirname + '/upload/' + req.file.filename);
  console.log('CSV file data has been uploaded in database ');
});

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}.`);
});