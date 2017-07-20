import { FETCH_SENTENCE, RECEIVE_SENTENCE } from '../ActionType';

export default function(state = { loading: false, sentenceList: [] }, action) {
    switch (action.type) {
        case FETCH_SENTENCE:
            return Object.assign({}, state, {
                loading: true
            });
        case RECEIVE_SENTENCE:
            return Object.assign({}, state, {
                loading: false,
                sentenceList: action.sentenceList
            });
        default:
            return state;
    }
}