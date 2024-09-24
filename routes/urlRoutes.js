import express from 'express';
import Url from '../models/Url.js'; // Asegúrate de usar .js
import { nanoid } from 'nanoid';

const router = express.Router();

// Create Short URL
router.post('/', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const shortCode = nanoid(6);
    const newUrl = new Url({ url, shortCode });
    await newUrl.save();
    res.status(201).json(newUrl);
});

// Retrieve Original URL
router.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const urlEntry = await Url.findOne({ shortCode });
    if (!urlEntry) return res.status(404).json({ error: 'Not found' });

    urlEntry.accessCount++;
    await urlEntry.save();
    res.status(200).json(urlEntry);
});

// Update Short URL
router.put('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const urlEntry = await Url.findOneAndUpdate({ shortCode }, { url, updatedAt: Date.now() }, { new: true });
    if (!urlEntry) return res.status(404).json({ error: 'Not found' });

    res.status(200).json(urlEntry);
});

// Delete Short URL
router.delete('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const result = await Url.deleteOne({ shortCode });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });

    res.status(204).send();
});

// Get URL Statistics
router.get('/:shortCode/stats', async (req, res) => {
    const { shortCode } = req.params;
    const urlEntry = await Url.findOne({ shortCode });
    if (!urlEntry) return res.status(404).json({ error: 'Not found' });

    res.status(200).json(urlEntry);
});

// Agregar esta ruta para obtener todos los short URLs (opcional)
router.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving URLs' });
    }
});

const urlRoutes = router; // Esto es una exportación nombrada
export default urlRoutes; // Agrega una exportación por defecto
