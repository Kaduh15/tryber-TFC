import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Users extends Model {
  id!: number;
  userName!: string;
  email!: string;
  password!: string;
  role!: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: STRING,
    allowNull: true,
  },
  email: {
    type: STRING,
    allowNull: true,
  },
  password: {
    type: STRING,
    allowNull: true,
  },
  role: {
    type: STRING,
    allowNull: true,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Users;
