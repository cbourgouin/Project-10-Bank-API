import { selectLogin } from '../utils/selectors'
import loginRequest from '../api/loginRequest'

const initialState = {
    formVisible: false
}

const TOGGLE = 'formVisible_toggle';

/*Action **********************************/

export const formVisibleToggle = () => ({ type: TOGGLE });

/*Reducer *********************************/

export default function userPageReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE: {
            return { ...state, formVisible: !state.formVisible }
        }
        default: {
            return state;
        }
    }
}