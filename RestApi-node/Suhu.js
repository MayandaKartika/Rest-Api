const express = require("express") // memanggil library exprees js
const bodyParser = require ("body-parser") // memanggil library body-parser
const cors = require("cors"); // memanggil library library cors
const { Console } = require("console");
const app = express()

// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())
// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({extended: true}))
// penggunaan cors agar endpoint dapat diakses oleh cross platform
app.use(cors())

// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run port 8000");
})

app.get("/convert/:suhu/:data", (req,res) => {
    const suhu = req.params.suhu
    const data = Number(req.params.data)

    let response 
    if (suhu == "celcius") {
        response = {
            celcius: data,
            Hasil: {
                reamur: (4/5) * data,
                fahrenheit: (9/5) * data + 32,
                kelvin: 273 + data
            }
        }
    } else if(suhu == "reamur") {
        response = {
            reamur: data,
            Hasil: {
                celcius: (5/4) * data,
                fahrenheit: (9/4) * data + 32,
                kelvin: 273 + data
            }
        }
    } else if(suhu == "fahrenheit"){
        response = {
            fahrenheit: data,
            Hasil: {
                celcius: (5/9) * (data - 32),
                reamur: (4/9) * (data - 32),
                kelvin: (data + 459.67) / 1.8
            }
        }
    } else if (suhu == "kelvin") {
        response = {
            kelvin: data,
            Hasil: {
                celcius: data - 273,
                fahrenheit: data * 1.8 - 459.67,
                reamur: (4/5) * (data - 273)
            }
        }
    }

    res.json(response)
})