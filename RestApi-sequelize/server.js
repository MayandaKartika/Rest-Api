// inisiasi library
const express = require("express")
const app = express()
const product = require("./router/product")
const costumer = require("./router/costumer")
const transaksi = require("./router/transaksi")
app.use("/product",product)
app.use("/costumer", costumer)
app.use("/transaksi", transaksi)

app.listen(8000, () => {
    console.log("server run on port 8000");
})
