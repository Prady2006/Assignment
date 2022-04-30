const express = require('express')
const router = express.Router()

const {
    create_new_chat,
    get_chat,
    delete_all_chats_for_user,
    delete_chat
} = require('../controllers/chat_log_controller')

router.post('/chatlogs/:user/',create_new_chat)
router.get('/chatlogs/:user/',get_chat)
router.delete('/chatlogs/:user',delete_all_chats_for_user)
router.delete('/chatlogs/:user/:msgid',delete_chat)



module.exports = router;