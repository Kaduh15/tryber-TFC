import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  // modelName: 'teamsModel',
  timestamps: false,
});

export default Team;
