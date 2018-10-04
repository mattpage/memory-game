import { createSelector } from 'reselect/lib'
import { NAMESPACE } from './constants'

const selectService = state => state[NAMESPACE] || {}

export const selectStatus = createSelector(selectService, service => service.status)

export const selectResults = createSelector(selectService, service => service.results)

export const selectError = createSelector(selectService, service => service.error)
