import {
  Model, INTEGER, STRING, DECIMAL,
} from 'sequelize';

import db from '.';

class Users extends Model {
  id!: number;

  email!: string;

  name!: string;

  password!: string;

  balance!: number;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  balance: {
    type: DECIMAL(10, 2),
    defaultValue: 0,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
