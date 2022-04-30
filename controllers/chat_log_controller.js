const { default: mongoose } = require('mongoose')
const db_config = require('../config/database_config')
const {
    chat_log_model,
} = require('../models/schema')


const create_new_chat = async (req, res ) => {

    try{
        // validating input ; TODO: use middleware to validate input 
        if(
            typeof(req.body[db_config.MESSAGE]) != "string" ||
            typeof(req.body[db_config.TIMESTAMP]) != "number"  ||
            typeof(req.body[db_config.IS_SENT]) != "boolean"  ||
            typeof(req.params.user) != "string"
            ){
                return res.status(400).json({
                    success: false ,
                    msg:'Bad Input'
                })
        } 
        let chat_log_entry = new chat_log_model()
        chat_log_entry[db_config.MESSAGE] = req.body[db_config.MESSAGE]
        chat_log_entry[db_config.TIMESTAMP] = new Date(req.body[db_config.TIMESTAMP])
        chat_log_entry[db_config.IS_SENT] = req.body[db_config.IS_SENT]
        chat_log_entry[db_config.USER_ID] = req.params.user

        await chat_log_entry.save()
        
        return res.status(200).json({
            success: true ,
            msg:'Created new chat',
            data: [ { [db_config.MESSAGE_ID]: chat_log_entry._id}]
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

const get_chat = async (req, res) =>{ 
    try{
        if( 
            typeof(req.params.user) != "string" 
        ) {
            return res.status(400).json({
                success: false ,
                msg: 'Bad Input'
            })
        }
        let fetch_count = Number(req.query.limit) || 10;
        let query = [
            {
                "$match": {
                    [db_config.USER_ID]: req.params.user
                }
            }
        ]
        // sort the array in descending order to get most recent first
        query.push({
            "$sort": {
                [db_config.TIMESTAMP]: -1
            }
        })
        let result = await chat_log_model.aggregate(query).allowDiskUse(true);

        let idx = result.findIndex(i => i._id == req.query.start)
        if(idx != -1){
            result = result.slice(idx , idx + fetch_count);
        }else{
            result = result.slice(0,   fetch_count )
        }
        return res.status(200).json({
            success: true ,
            msg: 'Data Found',
            data: result
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'    
        })
    }
}

const delete_all_chats_for_user = async (req, res) => {
    try{
        if( 
            typeof(req.params.user) != "string" 
        ) {
            return res.status(400).json({
                success: false ,
                msg: 'Bad Input'
            })
        }

        let r = await chat_log_model.deleteMany({[db_config.USER_ID]: req.params.user});
        return res.status(200).json({
            success: true ,
            msg:'Data deleted',
            data: r.deletedCount
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

const delete_chat = async (req , res) => {
    try{
        if( 
            typeof(req.params.user) != "string" ||
            typeof(req.params.msgid) != "string"
        ) {
            return res.status(400).json({
                success: false ,
                msg: 'Bad Input'
            })
        }

        let r = await chat_log_model.findOneAndDelete({
            [db_config.USER_ID]: req.params.user,
            "_id" : mongoose.Types.ObjectId(req.params.msgid)
        });
        if(!r) {
            return res.status(404).json({
                success: false,
                msg: 'Not found'
            })
        }else {
                return res.status(200).json({
                success: true ,
                msg:'Data deleted',
                data: [r]
            })
        }
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        })
    }
}

module.exports = {
    create_new_chat,
    get_chat,
    delete_all_chats_for_user,
    delete_chat
}