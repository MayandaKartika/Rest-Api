const { urlencoded } = require("express")
const express = require("express")
const multer = require("multer")
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi
const app = express()

app.use(express.urlencoded({extended: true}))

app.get("/", async (req,res) => {
    let data = await transaksi.findAll({
        include: [
            "costumer",
            {
                model: models.detail_transaksi,
                as: "detail_transaksi",
                include: ["product"]
            }
        ]
    })
    res.json({
        data: data
    })
})

app.get("/:transaksi_id", async (req,res) => {
    // ambil data by id
    let param = {transaksi_id: req.params.transaksi_id}
    let data = await transaksi.findOne({
        where: param,
        include: [
            "costumer",
            {
                model: models.detail_transaksi,
                as: "detail_transaksi",
                include: ["product"]
            }
        ]
    })
    res.json({
        data: data
    })
})

app.post("/", async (req,res) => {
    // insert data
    // tampung data yg direquest
    let data = {
        costumer_id: req.body.costumer_id,
        waktu: req.body.waktu
    }

    // proses insert data ke table transaksi
    transaksi.create(data)
    .then(result => {
        // ambil nilai dari transaksi_id
        let transaksi_id = result.transaksi_id
        let detail = JSON.parse(req.body.detail_transaksi)

        // proses menyisipkan transaksi_id
        detail.forEach(element => {
            element.transaksi_id = transaksi_id
        });

        detail_transaksi.bulkCreate(detail)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", async (req,res) => {
    // update data

    // tampung data yg direquest
    let data = {
        costumer_id: req.body.costumer_id,
        waktu: req.body.waktu
    }

    // tampung parameter
    let param = {
        transaksi_id: req.body.transaksi_id
    }

    // proses insert data ke table transaksi
    transaksi.update(data, {where: param})
    .then(result => {

        // hapus data di detail
        detail_transaksi.destroy({where: param}).then().catch()

        // ambil nilai dari transaksi_id
        let transaksi_id = param.transaksi_id
        let detail = JSON.parse(req.body.detail_transaksi)

        // proses menyisipkan transaksi_id
        detail.forEach(element => {
            element.transaksi_id = transaksi_id
        });
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:transaksi_id", async (req,res) => {
    // delete data

    // tampung transaksi_id
    let param = { transaksi_id: req.params.transaksi_id}
    try {
        // hapus detail transaksi
        await detail_transaksi.destroy({where: param})

        // hapus transaksinya
        await transaksi.destroy({where: param})

        res.json({
            message: "data has been deleted"
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app