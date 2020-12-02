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

// end-point "/balok" dengan method POST
app.post("/balok", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversikan menjadi tipe numerik
    let p = Number(req.body.p) // mengambil nilai panjang dari body
    let l = Number(req.body.l) // mengambil nilai lebar dari body
    let t = Number(req.body.t) // mengambil nilai tinggi
    
    let luas = 2 * (p * l + p * t + l * t)
    let volume = p * l * t

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        panjang: p,
        lebar: l,
        tinggi: t,
        Luas: luas,
        Volume: volume
    }

    // memberikan response dengan format JSON yang berisi objek diatas
    res.json(response)
})

// end-point "/kubus" dengan method POST
app.post("/kubus", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversikan menjadi tipe numerik
    let s = Number(req.body.s) // mengambil nilai sisi dari body
    
    let luas = 6 * s * s
    let volume = s * s * s

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        sisi: s,
        Luas: luas,
        Volume: volume
    }

    // memberikan response dengan format JSON yang berisi objek diatas
    res.json(response)
})

// end-point "/tabung" dengan method POST 
app.post("/tabung", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversikan menjadi tipe numerik
    let r = Number(req.body.r) // mengambil nilai jari - jari dari body
    let t = Number(req.body.t) // mengambil nilai tinggi dari body
    
    let luas = 2 * Math.PI * r * (r + t)
    let volume = Math.PI * r * r * t 

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        jari_jari: r,
        tinggi: t,
        Luas: luas,
        Volume: volume
    }

    // memberikan response dengan format JSON yang berisi objek diatas
    res.json(response)
})

// end-point "/prisma_segitiga" dengan method POST 
app.post("/prisma_segitiga", (req,res) => {
    // menampung data yang dikirimkan dan mengkonversikan menjadi tipe numerik
    let a = Number(req.body.a) // mengambil nilai sisi segitiga dari body
    let t1 = Number(req.body.t1) // mengambil nilai tinggi segitiga dari body
    let t2 = Number(req.body.t2) // mengambil nilai tinggi prisma dari body
    
    let luas = (2 * 1/2 * a * t1) + (a + a + a) * t2
    let volume = 1/2 * a * t1 * t2

    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        sisi: a,
        tinggiSegitiga: t1,
        tinggiPrisma: t2,
        Luas: luas,
        Volume: volume
    }

    // memberikan response dengan format JSON yang berisi objek diatas
    res.json(response)
})