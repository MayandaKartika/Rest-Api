// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const moment = require("moment")
const md5 = require("md5")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rent_car"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

//pelanggan```````````````````````````````````````````````pelanggan
// end-point akses data pelanggan
app.get("/pelanggan", (req, res) => {
    // create sql query
    let sql = "select * from pelanggan"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                pelanggan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data pelanggan berdasarkan id_pelanggan tertentu
app.get("/pelanggan/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    // create sql query
    let sql = "select * from pelanggan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                pelanggan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data pelanggan
app.post("/pelanggan", (req,res) => {

    // prepare data
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    }

    // create sql query insert
    let sql = "insert into pelanggan set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah ditambahkan"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data pelanggan
app.put("/pelanggan", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            id_pelanggan: req.body.id_pelanggan,
            nama_pelanggan: req.body.nama_pelanggan,
            alamat_pelanggan: req.body.alamat_pelanggan,
            kontak: req.body.kontak
        },

        // parameter (primary key)
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    // create sql query update
    let sql = "update pelanggan set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah diupdate"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data pelanggan berdasarkan id_pelanggan
app.delete("/pelanggan/:id", (req,res) => {
    // prepare data
    let data = {
        id_pelanggan: req.params.id
    }

    // create query sql delete
    let sql = "delete from pelanggan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah dihapus"
            }
        }
        res.json(response) // send response
    })
})

//mobil`````````````````````````````````````````````````````````mobil
// end-point akses data mobil
app.get("/mobil", (req, res) => {
    // create sql query
    let sql = "select * from mobil"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                mobil: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data mobil berdasarkan id_mobil tertentu
app.get("/mobil/:id", (req, res) => {
    let data = {
        id_mobil: req.params.id
    }
    // create sql query
    let sql = "select * from mobil where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                mobil: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data mobil
app.post("/mobil", (req,res) => {

    // prepare data
    let data = {
        id_mobil: req.body.id_mobil,
        nomor_mobil: req.body.nomor_mobil,
        merk: req.body.merk,
        jenis: req.body.jenis,
        warna: req.body.warna,
        tahun_pembuatan: req.body.tahun_pembuatan,
        biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
        image: req.body.image
    }

    // create sql query insert
    let sql = "insert into mobil set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah ditambahkan"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data mobil
app.put("/mobil", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            id_mobil: req.body.id_mobil,
            nomor_mobil: req.body.nomor_mobil,
            merk: req.body.merk,
            jenis: req.body.jenis,
            warna: req.body.warna,
            tahun_pembuatan: req.body.tahun_pembuatan,
            biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
            image: req.body.image
        },

        // parameter (primary key)
        {
            id_mobil: req.body.id_mobil
        }
    ]

    // create sql query update
    let sql = "update mobil set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah diupdate"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data mobil berdasarkan id_mobil
app.delete("/mobil/:id", (req,res) => {
    // prepare data
    let data = {
        id_mobil: req.params.id
    }

    // create query sql delete
    let sql = "delete from mobil where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah dihapus"
            }
        }
        res.json(response) // send response
    })
})


//sewa```````````````````````````````````````````````sewa
// end-point akses data sewa
app.get("/sewa", (req, res) => {
    // create sql query
    let sql = "select * from sewa"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                sewa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data sewa berdasarkan id_sewa tertentu
app.get("/sewa/:id", (req, res) => {
    let data = {
        id_sewa: req.params.id
    }
    // create sql query
    let sql = "select * from sewa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                sewa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data sewa
app.post("/sewa", (req,res) => {

    // prepare data
    let data = {
        id_sewa: req.body.id_sewa,
        id_mobil: req.body.id_mobil,
        id_karyawan: req.body.id_karyawan,
        id_pelanggan: req.body.id_pelanggan,
        tgl_sewa: moment().format('YYYY-MM-DD HH:mm:ss'),
        tgl_kembali: moment().format('YYYY-MM-DD HH:mm:ss'),
        total_bayar: req.body.total_bayar
    }

    // create sql query insert
    let sql = "insert into sewa set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah ditambahkan"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data sewa
app.put("/sewa", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            id_sewa: req.body.id_sewa,
            id_mobil: req.body.id_mobil,
            id_karyawan: req.body.id_karyawan,
            id_pelanggan: req.body.id_pelanggan,
            tgl_sewa: moment().format('YYYY-MM-DD HH:mm:ss'),
            tgl_kembali: moment().format('YYYY-MM-DD HH:mm:ss'),
            total_bayar: req.body.total_bayar
        },

        // parameter (primary key)
        {
            id_sewa: req.body.id_sewa
        }
    ]

    // create sql query update
    let sql = "update sewa set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah diupdate"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data sewa berdasarkan id_sewa
app.delete("/sewa/:id", (req,res) => {
    // prepare data
    let data = {
        id_sewa: req.params.id
    }

    // create query sql delete
    let sql = "delete from sewa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah dihapus"
            }
        }
        res.json(response) // send response
    })
})

//karyawan```````````````````````````````````````````````karyawan
// end-point akses data karyawan
app.get("/karyawan", (req, res) => {
    // create sql query
    let sql = "select * from karyawan"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                karyawan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data karyawan berdasarkan id_karyawan tertentu
app.get("/karyawan/:id", (req, res) => {
    let data = {
        id_karyawan: req.params.id
    }
    // create sql query
    let sql = "select * from karyawan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                karyawan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data karyawan
app.post("/karyawan", (req,res) => {

    // prepare data
    let data = {
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: md5(req.body.password)
    }

    // create sql query insert
    let sql = "insert into karyawan set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah ditambahkan"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data karyawan
app.put("/karyawan", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            id_karyawan: req.body.id_karyawan,
            nama_karyawan: req.body.nama_karyawan,
            alamat_karyawan: req.body.alamat_karyawan,
            kontak: req.body.kontak,
            username: req.body.username,
            password: md5(req.body.password)
        },

        // parameter (primary key)
        {
            id_karyawan: req.body.id_karyawan
        }
    ]

    // create sql query update
    let sql = "update karyawan set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah diupdate"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data karyawan berdasarkan id_karyawan
app.delete("/karyawan/:id", (req,res) => {
    // prepare data
    let data = {
        id_karyawan: req.params.id
    }

    // create query sql delete
    let sql = "delete from karyawan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data telah dihapus"
            }
        }
        res.json(response) // send response
    })
})
app.listen(8000, () => {
    console.log("Run on port 8000")
})
