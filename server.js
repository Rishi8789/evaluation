const express = require('express');
const mongoose = require('mongoose');
// require('dotenv').config();

const app = express();
const PORT = 3001;

mongoose.connect(`mongodb+srv://rishi8789:rishimongodb@cluster0.0dchohe.mongodb.net/?retryWrites=true&w=majority/finalEvaluation`);

app.use(express.json());
app.use('/api', require('./routes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
