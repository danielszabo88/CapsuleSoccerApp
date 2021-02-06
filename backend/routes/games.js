const router = require("express").Router();
const Game = require("../model/gameModel");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {

});

router.get("/:id", (req, res) => {

});

router.post("/", auth, (req, res) => {

});

router.delete("/:id", auth, (req, res) => {

});

router.put("/:id", auth, (req, res) => {

});

module.exports = router;
