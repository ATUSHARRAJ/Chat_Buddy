const express = require("express");
const router = express.Router();
const{signup , login ,findId , conversation } = require("../controllers/Auth");
const {createMessage} = require("../controllers/Auth1");

router.post("/login",login);
router.post("/signup",signup);
router.get("/findId" , findId);
router.get("/conversation" , conversation);
router.post("/conversation/createMessage" , createMessage);

module.exports = router;