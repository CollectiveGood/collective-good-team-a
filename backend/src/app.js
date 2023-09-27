const express = require('express');
const app = express();

// Allow cross origin requests
const cors = require('cors');
app.use(cors());

// Default entrypoint
app.get('/', (req, res) => {
    res.send("Hello!");
});

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});