module.exports = {
  secret: 'life-assistant',
  database: process.env.MONGODB_HOST || 'mongodb://mongo:27017/life-assistant'
};
