import { QueryOptionsTransactionRequired } from 'sequelize';

export default function stringToBoolean(
  value: QueryOptionsTransactionRequired,
): boolean | undefined {
  switch (value) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
}
