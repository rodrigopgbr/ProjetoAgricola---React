import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import system from './system/reducer';

export default combineReducers({ auth, user, system });
