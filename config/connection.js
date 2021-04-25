const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(
          process.env.DB_NAME,
          process.env.DB_USER,
          process.env.DB_PASSWORD,
          {
              host: process.env.DB_HOST,
              dialect: "mysql",
              port: process.env.DB_PORT,

              // Prevents mysql2 from converting decimal to string to preserve precision,
              // we will not run into precision issues so it's ok to opt out of this default behavior
              dialectOptions: {
                  decimalNumbers: true,
              },
          }
      );

module.exports = sequelize;
