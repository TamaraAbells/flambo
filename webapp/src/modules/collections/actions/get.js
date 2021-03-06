import api                      from '@flambo/api-client'
import { fetchItemIfNeeded }    from '../../../core/actions/actionsHelpers'
import { apiBaseUrl as apiUrl } from '../../../core/api'



export const FETCH_COLLECTION_REQUEST = 'FETCH_COLLECTION_REQUEST'
export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS'
export const FETCH_COLLECTION_FAILURE = 'FETCH_COLLECTION_FAILURE'
export const INVALIDATE_COLLECTION    = 'INVALIDATE_COLLECTION'

export const fetchCollection = id => (dispatch, getState) => {
    dispatch({ type: FETCH_COLLECTION_REQUEST, id })

    const { auth: { token } } = getState()

    return api.collections.get(id, { apiUrl, token })
        .then(data => {
            dispatch({ type: FETCH_COLLECTION_SUCCESS, id, data })
        })
        .catch(error => {
            dispatch({ type: FETCH_COLLECTION_FAILURE, id, error })
        })
}

export const fetchCollectionIfNeeded = fetchItemIfNeeded('collections', fetchCollection)

export const invalidateCollection = id => ({ type: INVALIDATE_COLLECTION, id })
