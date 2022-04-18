const client = require("../database/db");
const fs = require('fs');
const csv = require('fast-csv');
const pg = require('pg');
var alert = require("alert");

class projectManagement{
    
  constructor(){ }

  addProject = (request, response) => {
    let {projectName,deptCode,users,product,status,cieAreaId,financeProductId} = request.body;
      client.query(
        `insert into projects (projectName,deptCode,users,product,status,cieAreaId,financeProductId) values($1,$2,ARRAY[$3],$4,$5,$6,$7)`, 
        [projectName,deptCode,users,product,status,cieAreaId,financeProductId],
        (err, resp) => {
          if (err) {
            console.log(err);
            response.status(400).send({message: "Project could not be added. Please try again."});
          } else {
            console.log(resp);
            console.log("New project inserted");
            response.status(200).send({message: "New Project Added"});
          }
        });  
  }

  viewProjects(request, response){
    client.query(
      `select id,projectName,deptCode,users,product,status,cieareaid,financeproductid from projects`, 
      (err, resp) => {
        if (err) {
          console.log(err);
          response.status(400).send({message: "Error in fetching data."});
        } else {
          console.log(resp.rows);
          console.log("Project mapping data");
          response.status(200).send({object: resp.rows, message: "Project details fetched successfully!"});
        }
    });  
  }

  viewSingleProject(request, response){
    const id = parseInt(request.params.id);
    client.query(
      `select id,projectname,deptcode,users,product,status,cieareaid,financeproductid from projects where id = ($1)`, [id],
      (err, resp) => {
        if (err) {
          console.log(err);
          response.status(400).send({message: "Error in fetching data."});
        } else {
          console.log(resp);
          console.log("Project mapping data");
          response.status(200).send({object: resp.rows, message: "Project details fetched successfully!"});
        }
      });  
  }

 
  deleteProject(request, response){
    const id = parseInt(request.params.id);
    client.query(
      `delete from projects where id = $1`, [id],
        (err, resp) => {
          if (err) {
            console.log(err);
            response.status(400).send({message: "Error in fetching data."});
          } else {
            console.log(resp.rows);
            response.status(200).send({message: "Project deleted successfully!"});
          }
      });  
  }

  updateProject(request, response){
      const id = parseInt(request.params.id);
      let {projectname,deptcode,users,product,status,cieareaid,financeproductid} = request.body;
      console.log("Project");
      client.query(
        `update projects set projectname = $1, deptcode = $2, users = ARRAY[$3], product = $4, status = $5, cieareaid = $6,financeproductid = $7 where id = $8`, 
        [projectname,deptcode,users,product,status,cieareaid,financeproductid,id],
        (err, resp) => {
          if (err) {
              console.log(err);
              response.status(400).send({message: "Project could not be updated. Please try again."});
          } else {
              console.log(resp);
              console.log("Project is updated");
              response.status(200).send({message: "Project Updated"});
          }
        });  
  }

    UploadCsvDataToPSQL(filePath){
      let stream = fs.createReadStream(filePath);
      let csvData = [];
      let csvStream = csv
          .parse()
          .on("data", function (data) {
              csvData.push(data);
          })
          .on("end", function () {
              // Remove Header ROW
              csvData.shift();

              const query = "insert into projects (projectName,deptCode,users,product,status,updatedat,createdat,cieAreaId,financeProductId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
                try {
                  csvData.forEach(row => {
                    client.query(query, row, (err, response) => {
                      if (err) {
                        console.log(err.stack);
                        //response.status(400).send({message: "Bulk Import Failed"});
                      } else {
                        console.log("inserted " + response.rowCount + " row:", row);
                        //response.status(200).send({message: "Bulk Import Successful"});
                      }
                    });
                  });
                } finally {
                }
               
              // delete file after saving to PSQL database
              // -> you can comment the statement to see the uploaded CSV file.
              fs.unlinkSync(filePath)
          // });
        });
      stream.pipe(csvStream);
  }

}


module.exports = projectManagement;