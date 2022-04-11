const client = require("../database/db");

class projectManagement{
    
    constructor(){

    }

    addProject = (request, response) => {
        let {projectName,deptCode,users,product,status,cieAreaId,financeProductId} = request.body;
        client.query(
            `insert into projects (projectName,deptCode,users,product,status,cieAreaId,financeProductId) values($1,$2,$3,$4,$5,$6,$7)`, 
            [projectName,deptCode,users,product,status,cieAreaId,financeProductId],
            (err, resp) => {
              // console.log(resp);
              if (err) {
                console.log(err);
                response.status(400).send({message: "Project could not be added. Please try again."});
              } else {
                console.log("New project inserted");
                response.status(200).send({message: "New Project Added"});
              }
            }
        );  
    }

    


}

module.exports = projectManagement;