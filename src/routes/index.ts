import express from "express";
const router=express.Router();

const {addUser, getUserByID}= require("../controllers/userControllers")
const {addNewPodcast, addChannelID, getAllPodcasts, getChannelID} = require("../controllers/podcastControllers")

router.post("/addUser",addUser);
router.get("/getUser",getUserByID);
router.get("/getAllPodcasts", getAllPodcasts);
router.get("/getChannelID",getChannelID);
router.post("/addPodcast", addNewPodcast);
router.post("/addChannelID", addChannelID);

module.exports=router;