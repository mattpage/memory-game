import { fetchGameData } from './actions'
import { NAMESPACE, LOADING, NOT_ASKED } from './constants'
import reducer from './reducer'
import fetchGameDataFlow from './sagas'
import { selectStatus, selectResults, selectError } from './selectors'

export {
  fetchGameData,
  LOADING,
  NAMESPACE,
  NOT_ASKED,
  reducer,
  fetchGameDataFlow,
  selectStatus,
  selectResults,
  selectError,
}
