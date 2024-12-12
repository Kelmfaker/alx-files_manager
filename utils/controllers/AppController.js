// controllers/AppController.js
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(request, response) {
    try {
      const redis = redisClient.isAlive();
      const db = dbClient.isAlive();
      response.status(200).send({ redis, db });
    } catch (error) {
      console.log(error);
      response.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async getStats(request, response) {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      response.status(200).send({ users, files });
    } catch (error) {
      console.log(error);
      response.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AppController;
