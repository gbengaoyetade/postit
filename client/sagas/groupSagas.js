import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { deleteGroupSuccess, groupDeleted } from '../actions/groupActions';

const makeDeleteGroupCall = async (groupId) => {
  const response = await axios.delete(`/api/group/${groupId}/delete`);
  return response;
};
/**
 * @param {number} groupId - Id of the group beign deleted
 *
 * @returns {void}
 */
function* deleteGroup({ groupId }) {
  const response = yield makeDeleteGroupCall(groupId);
  const { data, status } = response;
  if (status === 200) {
    yield put(deleteGroupSuccess(true));
    yield put(groupDeleted(groupId));
  } else {
    yield put({ type: 'GROUP_DELETE_ERROR', error: data.message });
  }
}

/**
 *
 * @returns {void}
 */
function* deleteGroupWatcher() {
  yield takeEvery('DELETE_GROUP', deleteGroup);
}

export default deleteGroupWatcher;
