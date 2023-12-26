const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notice = require('../models/Notice');

// Create a notice
router.post('/notices', auth, async (req, res) => {
  try {
    const { title, body, category, date } = req.body;
    const newNotice = new Notice({
      title,
      body,
      category,
      date,
      user: req.user._id, // Assign the notice to the logged-in user
    });
    await newNotice.save();
    res.status(201).json({ message: 'Notice created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get all notices with optional category filter
router.get('/notices', auth, async (req, res) => {
  try {
    const categoryFilter = req.query.category;
    const query = categoryFilter ? { user: req.user._id, category: categoryFilter } : { user: req.user._id };
    const notices = await Notice.find(query);
    res.status(200).json(notices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update a notice
router.put('/notices/:noticeId', auth, async (req, res) => {
  try {
    const { title, body, category, date } = req.body;
    const noticeId = req.params.noticeId;

    const updatedNotice = await Notice.findByIdAndUpdate(
      noticeId,
      { title, body, category, date },
      { new: true } // Return the updated notice
    );

    if (!updatedNotice) {
      return res.status(404).json({ message: 'Notice not found.' });
    }

    res.status(200).json({ message: 'Notice updated successfully.', notice: updatedNotice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete a notice
router.delete('/notices/:noticeId', auth, async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const deletedNotice = await Notice.findByIdAndDelete(noticeId);

    if (!deletedNotice) {
      return res.status(404).json({ message: 'Notice not found.' });
    }

    res.status(200).json({ message: 'Notice deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
