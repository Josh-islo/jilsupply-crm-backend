// models/Client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Veuillez fournir le nom de l\'entreprise'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  contact: {
    type: String,
    required: [true, 'Veuillez fournir un contact'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Veuillez fournir un email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Veuillez fournir un email valide'
    ]
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: {
      type: String,
      default: 'Gabon'
    }
  },
  status: {
    type: String,
    enum: ['Prospect', 'Actif', 'Inactif'],
    default: 'Prospect'
  },
  category: {
    type: String,
    trim: true
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate avec virtuals
ClientSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'client',
  justOne: false
});

// Index pour la recherche
ClientSchema.index({ name: 'text', contact: 'text', email: 'text' });

module.exports = mongoose.model('Client', ClientSchema);