import { FETCH_BOOK_DETAIL, RECEIVE_BOOK_DETAIL } from '../ActionType';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_BOOK_DETAIL:
            return {
                ...state,
                [action.bookId]: {
                    loading: true
                }
            }
        case RECEIVE_BOOK_DETAIL:
            return {
                ...state,
                [action.bookId]: {
                    loading: false,
                    content: action.bookDetail
                }
            }
        default:
            return state;
    }
}