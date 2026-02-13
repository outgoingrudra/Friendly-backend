const mongoose = require("mongoose")
const { MONGODB_URI } = require("../../constant")

const ConnectDB = async () => {
    await mongoose.connect(MONGODB_URI, {
        dbName: "Friendly"
    })
}

module.exports = ConnectDB
