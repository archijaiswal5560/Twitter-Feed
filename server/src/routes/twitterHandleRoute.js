const express = require("express");
const router = express.Router();

const {
  addHandle,
  getHandles,
  toggleHandle
} = require("../controllers/twitterHandleController");

router.post("/add-handles", addHandle);
router.get("/get-handles", getHandles);
router.patch("/update-handles/:uuid/toggle", toggleHandle);

module.exports = router;
