const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

exports.mongoDatabase = () => {
  dotenv.config()
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri);
  return client.db(process.env.MONGO_DATABASE)
}
