const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require("../database/db");
const privateKey = '12345#abcde';
// use to encrypt and decrypt

class userManagement{
    
    constructor(){

    }

    register = (request, response) => {
        let {name, email, password, privilege} = request.body;
        if(email && password){
            // we need to check if the user already exists
            client.query(
                `select * from users where email = $1`, [email],
                (err, resp) => {
                  // console.log(resp.rows);
                  if (err) {
                     response.status(400).send({message: "database error!"});
                  } else if (resp.rows.length >= 1) {
                     response.status(404).send({message: "User already exists"});
                  }
                }
              );

            let hashed_password = bcrypt.hashSync(password,12);
            client.query(
                `insert into users (name,email,password,privilege) values($1,$2,$3,$4)`, [name,email, hashed_password, privilege],
                (err, resp) => {
                  // console.log(resp);
                  if (err) {
                    console.log(err);
                    response.status(400).send({message: "Registration Failed. Please try again."});
                  } else {
                    console.log("New user inserted");
                    response.status(200).send({message: "Registration Successful"});
                  }
                }
              );    
        }else{
            return response.status(401).send({message: "Username or Passsword not found"});
        }
    }

    verifyToken(request, response, next) {
        if (!request.headers.authorization) {
          return response.status(401).json({ message: "Unauthorized Access" });
        }
        let token = request.headers.authorization.split(" ")[1];
        if (token === "null") {
          return res.status(401).json({ message: "Unauthorized Access" });
        }
        let payload = jwt.verify(token, privateKey);
        request.email = payload.subject;
        next();
    }

    login(request, response){
        let {email, password} = request.body;
        if(email && password){
            client.query(
                `select * from users where email = $1`, [email],
                (err, resp) => {
                    if (err) {
                        response.status(400).json({ message: "database error" });
                    } else if (resp.rows.length == 0) {
                        response.status(404).json({ message: "User is not registered" });
                    } else {
                    let userData = resp.rows[0];
                    var check = bcrypt.compareSync(password, userData.password);
                    if (check) {
                      // after validation generate a JWT token
                      let token = jwt.sign({ username: userData.email }, privateKey, {
                        expiresIn: "3h",
                      });
                      let privilege = userData.privilege;
                      response.status(200).send({ message: "Login Successful", token: token, privilege: privilege });
                    } 
                    else {
                      response.status(401).json({ message: "Incorrect Password" });
                    }
                  }
                }
            );

         }else{
          return response.status(401).json({message: "username or passsword not found"})
        }
    }
}

module.exports = userManagement;
