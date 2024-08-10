const express = require('express');
const dataController = require("../controllers/dataController");


const router = express.Router();

router.get("/read/date/:date", dataController.getDateData);
router.get("/read/month", dataController.getMonthData);
router.post("/add/date/:date", dataController.addData);

module.exports = router;