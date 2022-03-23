const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require("../database/db");
const privateKey = '12345#abcde';
// use to encrypt and decrypt

class userManagement{
    
    constructor(){

    }

    register = (request, response) => {
        let {email, password} = request.body;
        if(email && password){
            // we need to check if the user already exists
            client.query(
                `select * from users where email = $1`, [email],
                (err, resp) => {
                  // console.log(resp.rows);
                  if (err) {
                    res.status(400).send("database error!");
                  } else if (resp.rows.length >= 1) {
                    res.status(404).send("User already exists");
                  }
                }
              );

            let hashed_password = bcrypt.hashSync(password,12);
            client.query(
                `insert into users (email,password) values($1,$2)`, [email, hashed_password],
                (err, resp) => {
                  // console.log(resp);
                  if (err) {
                    console.log(err);
                    res.status(400).send("Registration Failed. Please try again.");
                  } else {
                    console.log("New user inserted");
                    res.status(200).send("Registration Successfull");
                  }
                }
              );    
        }else{
            return response.status(401).send("Username or Passsword not found");
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
                        response.status(404).json({ message: "User does not exist" });
                    } else {
                    let userData = resp.rows[0];
                    var check = bcrypt.compareSync(password, userData.password);
                    if (check) {
                      // after validation generate a JWT token
                      let token = jwt.sign({ username: userData.email }, privateKey, {
                        expiresIn: "3h",
                      });
                      response.status(200).send({ message: "Login Successful", token: token });
                    } 
                    else {
                      response.status(401).json({ message: "Incorrect Email or Password" });
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
