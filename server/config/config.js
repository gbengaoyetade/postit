
const dotenv = require('dotenv');

dotenv.load();
const config = {
  development: {
    use_env_variable: 'DEV_DB',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'TEST_DB',
    dialect: 'postgres',
  },
};
export default config;
