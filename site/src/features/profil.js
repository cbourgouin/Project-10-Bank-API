import { selectProfil } from '../utils/selectors'
import profilRequest from '../api/profilRequest'
import profilUpdateRequest from '../api/profilUpdateRequest';

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

const FETCHING = 'profil_fetching';
const UPDATING = 'profil_updating';
const RESOLVED = 'profil_resolved';
const REJECTED = 'profil_rejected';

/*Action **********************************/

const profilFetching = () => ({ type: FETCHING });
const profilUpdating = () => ({ type: UPDATING });
const profilResolved = (_data) => ({ type: RESOLVED, payload: _data });
const profilRejected = (_error) => ({ type: REJECTED, payload: _error });

export async function fetchProfil(_store, _token) {
    const status = selectProfil(_store.getState()).status;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    _store.dispatch(profilFetching());
    await profilRequest(_token)
        .then((response) => {
            if (response.status === 200) {
                _store.dispatch(profilResolved(response.body));
            } else {
                _store.dispatch(profilRejected(response));
            }
        })
        .catch((error) => {
            _store.dispatch(profilRejected(error));
        });
}

export async function updateProfil(_store, _token, _firstName, _lastName) {
    const status = selectProfil(_store.getState()).status;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    _store.dispatch(profilUpdating());
    await profilUpdateRequest(_token, _firstName, _lastName)
        .then((response) => {
            if (response.status === 200) {
                _store.dispatch(profilResolved(response.body));
            } else {
                _store.dispatch(profilRejected(response));
            }
        })
        .catch((error) => {
            _store.dispatch(profilRejected(error));
        });
}

/*Reducer *********************************/

export default function profilReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING: {
            if (state.status === 'void' || state.status === 'resolved' || state.status === 'rejected') {
                return { ...state, status: 'pending' }
            }
            return;
        }
        case UPDATING: {
            if(state.status === 'void' || state.status === 'resolved' || state.status === 'rejected'){
                return { ...state, status: 'updating'}
            }
            return;
        }
        case RESOLVED: {
            if (state.status === 'pending' || state.status === 'updating') {
                return { ...state, status: 'resolved', data: action.payload }
            }
            return;
        }
        case REJECTED: {
            if (state.status === 'pending' || state.status === 'updating') {
                return { ...state, status: 'rejected', data: null, error: action.payload }
            }
            return;
        }
        default: {
            return state;
        }
    }
}

