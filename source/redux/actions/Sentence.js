import { FETCH_SENTENCE, RECEIVE_SENTENCE } from '../ActionType';
import * as Fetcher from '../../common/Fetcher';

export function FetchSentence() {
    return dispatch => {
        dispatch(request());

        return Fetcher.fetcherTodaySentence()
            .then((result) => {
                dispatch(receiver(result));
            });
    };
}

function request() {
    return {
        type: FETCH_SENTENCE
    };
}

function receiver(sentenceList) {
    return {
        type: RECEIVE_SENTENCE,
        sentenceList
    };
}