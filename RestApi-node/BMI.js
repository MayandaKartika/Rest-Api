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

app.post("/bmi", (req,res) => {
    let t = Number(req.body.t)
    let b = Number(req.body.b)

    let bmi = b / (t * t)
    
    if (bmi < 18.5) {
        status = "Kekurangan berat badan"
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Normal (ideal)"
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Kelebihan berat badan"
    } else if (bmi >= 30) {
        status = "Kegemukan (Obesitas)"
    }

    let response = {
        Tinggi: t,
        BeratBadan: b,
        BMI: bmi,
        Status: status
    }

    res.json(response)
})