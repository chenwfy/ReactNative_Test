import { FETCH_BOOK_CATEGORY_LIST, RECEIVE_BOOK_CATEGORY_LIST } from '../ActionType';

const initState = {
    loading: true,
    listData: []
};
export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_BOOK_CATEGORY_LIST:
            return {
                ...state,
                loading: true
            }
        case RECEIVE_BOOK_CATEGORY_LIST:
            return {
                ...state,
                loading: false,
                listData: action.categoryList || []
            }
        default:
            return state;
    }
}