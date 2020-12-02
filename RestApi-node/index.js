const { constants } = require("crypto");
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

// endpoint "/percobaan1" dengan method GET
app.get("/percobaan1", (req,res) =>{
    // req merupakan variabel yang berisi data request
    // res merupakan variabel yang berisi data response dari end-point
    // membuat objek yang berisi data yang akan dijadikan response
    let response ={
        message: "Ini end-point pertamaku",
        method: req.method,
        code: res.statusCode
    }

    //memberikan response dengan fprmat JSON yang berisi objek di atas
    res.json(response)
})

// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run port 8000");
})

// endpoint "/data/nama/umur" dengan method GET
app.get("/data/:nama/:umur", (req,res) => {
    // :nama dan :umur -> diberikan titik dua didepan menunjukkan "nama" dan "umur"
    // bersifat dinamis yang dapat diubah nilainya saat melakukan request
    // menampung data yang dikirimkan
    let nama = req.params.nama // mengambil nilai pada parameter nama
    let umur = req.params.umur // mengambil nilai pada parameter umur

    // membuat objek yang berisi data yang akan dijadikan response
    // response berisi data nama dan umur sesuai dengan nilai parameter
    let response = {
        name: nama,
        age: umur
    }

    // memberikan response dengan format JSON yang berisi objek diatas
    res.json(response)
})

// end-point "/persegi_panjang" dengan method POST
app.post("/persegi_panjang", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversikan menjadi tipe numerik
    let p = Number(req.body.p) // mengambil nilai panjang dari body
    let l = Number(req.body.l) // mengambil nilai lebar dari body

    let luas = p * l
    let keliling = 2 * (p + l)

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        panjang: p,
        lebar: l,
        Luas: luas,
        Keliling: keliling
    }

    // memberikan response dengan format JSON yang berisi objek diatas
    res.json(response)
})