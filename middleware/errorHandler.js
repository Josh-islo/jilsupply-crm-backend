// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err);

  let error = { ...err };
  error.message = err.message;

  // Erreur MongoDB sur un ID mal formaté
  if (err.name === 'CastError') {
    const message = `Ressource non trouvée avec l'ID ${err.value}`;
    error = { message, status: 404 };
  }

  // Erreur MongoDB sur la duplication de valeurs uniques
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Valeur dupliquée pour le champ '${field}'. Veuillez utiliser une autre valeur.`;
    error = { message, status: 400 };
  }

  // Erreur de validation MongoDB
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, status: 400 };
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Erreur interne du serveur'
  });
};

module.exports = errorHandler;