module.exports = {
  secret: 'life-assistant',
  database: process.env.MONGODB_HOST || 'mongodb://localhost:27017/life-assistant'
};
