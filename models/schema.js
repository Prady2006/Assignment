const mongoose = require('mongoose')
const Schema = mongoose.Schema

const db_config = require('../config/database_config')


const chat_log_schema = new Schema({
    [db_config.IS_SENT]: {"type": Boolean },
    [db_config.USER_ID]: {"type": String},
    [db_config.TIMESTAMP]: {"type": Date , default : Date.now() }
},{ versionKey: false })



const chat_log_model = mongoose.model("chat_logs",chat_log_schema)
module.exports = {
    chat_log_model
}