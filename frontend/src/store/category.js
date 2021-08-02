//external imports

//internal imports
import { csrfFetch } from './csrf';

//action type strings
const GET_CATEGORIES = 'session/GET_CATEGORIES';

//thunk action creators

export const fetchGetCategories = () => async (dispatch) => {
    const res = await csrfFetch('/api/categories');
    if (res.ok) {
        const data = await res.json();
        dispatch(getCategories(data));
    }
};

//action creators

export function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        payload: categories,
    }
}

//reducer

const initialState = {};

export default function categoryReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_CATEGORIES:
            newState = { ...state };
            const arrCategories = action.payload;
            arrCategories.forEach(category => {
                newState[category.id] = category;
            });
            return newState;
        default:
            return state;
    }
}