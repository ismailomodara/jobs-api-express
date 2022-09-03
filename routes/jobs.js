const express = require('express');
const router = express.Router();

const { index, store, show, update, destroy } = require("../controllers/Jobs");

router.route("/jobs").get(index).post(store);
router.route("/jobs/:id").get(show).put(update).delete(destroy);

module.exports = router;
