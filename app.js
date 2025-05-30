const express = require('express');
const app = express();
app.use(express.json());
const accountRoutes = require('./routes/accounts');
const destinationRoutes = require('./routes/destinationRoutes');
const handlerRoutes = require('./routes/handlerRoutes');

require('./db');

app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server', handlerRoutes);

console.log('Database synced');
const PORT = 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
