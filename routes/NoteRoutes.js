const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/Notes');

const noteRoutes = express.Router();
const invalidId = (id) => !mongoose.isValidObjectId(id);
const payloadFrom = (body = {}) => body.content || body;

noteRoutes.post('/notes', async (req, res, next) => {
  try {
    const content = payloadFrom(req.body);
    if (!content || typeof content !== 'object' || Array.isArray(content)) {
      return res.status(400).json({ message: 'Note content can not be empty' });
    }
    const note = await Note.create(content);
    return res.status(201).json(note);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    return next(err);
  }
});

noteRoutes.get('/notes', async (_req, res, next) => {
  try {
    return res.json(await Note.find().sort({ createdAt: -1 }));
  } catch (err) { return next(err); }
});

noteRoutes.get('/notes/:noteId', async (req, res, next) => {
  try {
    if (invalidId(req.params.noteId)) return res.status(400).json({ message: 'Invalid note ID' });
    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    return res.json(note);
  } catch (err) { return next(err); }
});

noteRoutes.put('/notes/:noteId', async (req, res, next) => {
  try {
    if (invalidId(req.params.noteId)) return res.status(400).json({ message: 'Invalid note ID' });
    const content = payloadFrom(req.body);
    if (!content || typeof content !== 'object' || Array.isArray(content) || !Object.keys(content).length) {
      return res.status(400).json({ message: 'Note content can not be empty' });
    }
    const update = { ...content, dateUpdated: content.dateUpdated || new Date().toLocaleDateString('en-GB') };
    const note = await Note.findByIdAndUpdate(req.params.noteId, update, {
      new: true, runValidators: true, context: 'query'
    });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    return res.json(note);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    return next(err);
  }
});

noteRoutes.delete('/notes/:noteId', async (req, res, next) => {
  try {
    if (invalidId(req.params.noteId)) return res.status(400).json({ message: 'Invalid note ID' });
    const note = await Note.findByIdAndDelete(req.params.noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    return res.json({ message: 'Note deleted successfully', note });
  } catch (err) { return next(err); }
});

module.exports = noteRoutes;
