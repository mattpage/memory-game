import { call, put, take } from 'redux-saga/effects'
import { FETCH_GAME_DATA } from './constants'
import { failure, loading, notAsked, success } from './actions'
import request from './request'

export function* fetchGameDataFlow() {
  yield put(notAsked())

  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(FETCH_GAME_DATA)
    yield put(loading())
    try {
      const results = yield call(request)
      yield put(success(results))
    } catch (err) {
      yield put(failure(err))
    }
  }
}

export default [fetchGameDataFlow()]
