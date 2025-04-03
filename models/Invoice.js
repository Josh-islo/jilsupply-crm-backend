// models/Invoice.js
const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order'
  },
  status: {
    type: String,
    enum: ['Brouillon', 'Envoyée', 'Payée', 'Annulée', 'En retard'],
    default: 'Brouillon'
  },
  items: [
    {
      description: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      unitPrice: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        required: true
      }
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  taxTotal: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'XAF'
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentTerms: String,
  paymentMethod: String,
  notes: String,
  // Champs pour la comptabilité OHADA
  accountingEntries: [
    {
      accountNumber: String,
      description: String,
      debit: Number,
      credit: Number
    }
  ],
  journalEntry: {
    type: String,
    unique: true,
    sparse: true
  },
  accountingStatus: {
    type: String,
    enum: ['Non comptabilisée', 'Comptabilisée', 'Validée'],
    default: 'Non comptabilisée'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Middleware pour peupler le client et la commande lors de la requête
InvoiceSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'client',
    select: 'name contact email'
  }).populate({
    path: 'order',
    select: 'orderNumber orderType items'
  });
  next();
});

// Générer un numéro de facture unique avant l'enregistrement
InvoiceSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Invoice').countDocuments();
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    
    this.invoiceNumber = `INV-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
    
    // Générer un numéro d'écriture comptable si la facture est en mode "Comptabilisée"
    if (this.accountingStatus === 'Comptabilisée' && !this.journalEntry) {
      const journalCount = await mongoose.model('Invoice').countDocuments({
        accountingStatus: { $in: ['Comptabilisée', 'Validée'] }
      });
      this.journalEntry = `JRN-${year}${month}-${(journalCount + 1).toString().padStart(4, '0')}`;
    }
  }
  next();
});

module.exports = mongoose.model('Invoice', InvoiceSchema);