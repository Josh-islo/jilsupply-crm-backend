// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true
  },
  orderType: {
    type: String,
    enum: ['STANDARD', 'EXPRESS', 'MARITIME'],
    default: 'STANDARD'
  },
  status: {
    type: String,
    enum: ['Brouillon', 'Confirmée', 'En cours', 'Livrée', 'Annulée'],
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
  shippingCost: {
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
  notes: String,
  estimatedDeliveryDate: Date,
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

// Middleware pour peupler le client lors de la requête
OrderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'client',
    select: 'name contact email'
  });
  next();
});

// Générer un numéro de commande unique avant l'enregistrement
OrderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Order').countDocuments();
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    let prefix = 'STD';
    
    if (this.orderType === 'EXPRESS') {
      prefix = 'EXP';
    } else if (this.orderType === 'MARITIME') {
      prefix = 'SEA';
    }
    
    this.orderNumber = `${prefix}-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);