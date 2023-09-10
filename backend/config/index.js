module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE || 'backend/db/dev.db',
    jwtConfig: {
      secret: process.env.JWT_SECRET || 'secretvalue123',
      expiresIn: process.env.JWT_EXPIRES_IN || '1604800'
    }
  };