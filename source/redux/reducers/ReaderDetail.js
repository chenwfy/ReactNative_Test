import { FETCH_READER_DETAIL, RECEIVE_READER_DETAIL } from '../ActionType';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_READER_DETAIL:
            return {
                ...state,
                [action.readerId]: {
                    loading: true
                }
            }
        case RECEIVE_READER_DETAIL:
            return {
                ...state,
                [action.readerId]: {
                    loading: false,
                    content: action.readerDetail
                }
            }
        default:
            return state;
    }
}