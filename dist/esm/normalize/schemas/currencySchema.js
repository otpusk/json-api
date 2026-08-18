// Core
import { schema } from 'normalizr';
export const currencySchema = new schema.Entity('currencies', {}, {
  idAttribute: _ref => {
    let {
      code
    } = _ref;
    return code.toLowerCase();
  }
});