import { all } from 'redux-saga/effects';
import groupSagas from './groupSagas';

/**
 *
 * @returns {void}
 * @export
 */
export default function* rootSaga() {
  yield all([groupSagas()]);
}
