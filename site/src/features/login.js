import { selectLogin } from '../utils/selectors'
import loginRequest from '../api/loginRequest'

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

const FETCHING = 'login_fetching';
const RESOLVED = 'login_resolved';
const REJECTED = 'login_rejected';

/*Action **********************************/

const profilFetching = () => ({ type: FETCHING });
const profilResolved = () => ({ type: RESOLVED });
const profilRejected = (_error) => ({ type: REJECTED, payload: _error });

export async function fetchLogin(_store, _email, _password) {
    const status = selectLogin(_store.getState()).status;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    _store.dispatch(profilFetching());
    await loginRequest(_email, _password)
        .then((response) => {
            if (response.status === 200) {
                _store.dispatch(profilResolved());
                localStorage.setItem('token', response.body.token);
            } else {
                _store.dispatch(profilRejected(response));
            }
        })
        .catch((error) => {
            _store.dispatch(profilRejected(error));
        });
}

/*Reducer *********************************/

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING: {
            if (state.status === 'void') {
                return { ...state, status: 'pending' }
            }
            if (state.status === 'resolving') {
                return { ...state, status: 'updating' }
            }
            if (state.status === 'rejected') {
                return { ...state, error: null, status: 'updating' }
            }
            return;
        }
        case RESOLVED: {
            if (state.status === 'pending' || state.status === 'updating') {
                return { ...state, status: 'resolved'}
            }
            return;
        }
        case REJECTED: {
            if (state.status === 'pending' || state.status === 'updating') {
                return { ...state, status: 'rejected', error: action.payload }
            }
            return;
        }
        default: {
            return state;
        }
    }
}

