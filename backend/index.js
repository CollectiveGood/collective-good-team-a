const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Entry point for application
app.get('/', (req, res) => {
    res.send('Hello!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});