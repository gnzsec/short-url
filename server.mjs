import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import urlRoutes from './routes/urlRoutes.js'; // Asegúrate de usar .js
import dbConfig from './config/db.js'; // Asegúrate de usar .js

const app = express();
const PORT = 3000;

// Conectar a MongoDB
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use('/api/shorten', urlRoutes); // Asegúrate de que esto esté correcto

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
