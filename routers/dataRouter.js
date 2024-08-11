const express = require('express');
const dataController = require("../controllers/dataController");


const router = express.Router();

router.get("/read/date/:date", dataController.getDateData);
router.get("/read/month", dataController.getMonthData);
router.post("/add/date/:date", dataController.addData);
router.post("/edit/date/:date", dataController.editData);
router.post("/delete/date/:date/id/:id");

module.exports = router;