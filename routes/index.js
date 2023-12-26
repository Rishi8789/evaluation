const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const noticeRoutes = require('./notices');

router.use('/api',authRoutes);
router.use('/api',noticeRoutes);

module.exports = router;