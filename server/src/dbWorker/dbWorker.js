import sequelize from 'sequelize';

// const PORT = 5432;
//const DATABASE_NAME = 'postgres';
//const IP_HOST = '';
const USER_NAME = 'admin';
const PASSWORD = 'root';
// const REBOOT_ATTEMPTS = 3;

export const dbWorker = new sequelize.Sequelize(
  DATABASE_NAME,
  USER_NAME,
  PASSWORD,
  {
    host: IP_HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  },
);
