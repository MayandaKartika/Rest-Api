const express = require("express") 
const bodyParser = require ("body-parser") 
const cors = require("cors");
const { Console } = require("console");
const { response } = require("express");
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.listen(8000, () => {
    console.log("Server run port 8000");
})

app.post("/bilangan/:x/:y/:data", (req,res) => {
    var x = String(req.params.x)
    var y = String(req.params.y)
    const data = String(req.params.data)

    let response
    if(x == "biner"){
        if(y == "decimal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,2).toString(10)
            }
        } 
        else if(y == "octal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,2).toString(8)
            }
        } 
        else if(y == "hexadecimal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,2).toString(16)
            }
        } 
    }
     else if(x == "decimal"){
        if(y == "octal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,10).toString(8)
            }
        } 
        else if(y == "biner"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,10).toString(2)
            }
        } 
        else if(y == "hexadecimal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,10).toString(16)
            }
        } 
    }
     else if(x == "octal"){
        if(y == "decimal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,8).toString(10)
            }
        } 
        else if(y == "biner"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,8).toString(2)
            }
        } 
        else if(y == "hexadecimal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,8).toString(16)
            }
        } 
    } 
    else if(x == "hexadecimal"){
        if(y == "decimal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,16).toString(10)
            }
        } 
        else if(y == "octal"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,16).toString(8)
            }
        } 
        else if(y == "biner"){
            response = {
                convert: x + " -> " + y,
                hasil: parseInt(data,16).toString(2)
            }
        } 
    }

    res.json(response)
})