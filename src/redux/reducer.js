import { combineReducers } from 'redux';

import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import accounts from '../modules/accounts/AccountsState';
import auth from '../modules/login/AuthState';

export default combineReducers({
  auth,
  app,
  accounts,
  gallery,
  calendar,
});
