const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  noteTitle: { type: String, required: true, trim: true },
  noteDescription: { type: String, required: true, trim: true },
  priority: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW'],
    default: 'MEDIUM',
    uppercase: true,
    trim: true
  },
  dateAdded: { type: String, default: () => new Date().toLocaleDateString('en-GB') },
  dateUpdated: { type: String, default: () => new Date().toLocaleDateString('en-GB') }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Note', noteSchema);
