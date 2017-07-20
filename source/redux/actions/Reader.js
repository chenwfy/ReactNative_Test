import { FETCH_READER_LIST, RECEIVE_READER_LIST, FETCH_READER_DETAIL, RECEIVE_READER_DETAIL } from '../ActionType';
import * as Fetcher from '../../common/Fetcher';

export function FetchReaderList(category, pageIndex) {
    return dispatch => {
        dispatch(requestReaderList(category));

        return Fetcher.fetcherReaderList(category, pageIndex)
            .then((result) => {
                dispatch(receiverReaderList(result, category));
            });
    };
}

function requestReaderList(category) {
    return {
        type: FETCH_READER_LIST,
        category
    };
}

function receiverReaderList(readerListJson, category) {
    return {
        type: RECEIVE_READER_LIST,
        readerListJson,
        category
    };
}

export function FetchReaderDetail(readerId) {
    return dispatch => {
        dispatch(requestReaderDetail(readerId));

        return Fetcher.fetcherReaderDetail(readerId)
            .then((detail) => {
                dispatch(receiverReaderDetail(detail, readerId));
            });
    };
}

function requestReaderDetail(readerId) {
    return {
        type: FETCH_READER_DETAIL,
        readerId
    };
}

function receiverReaderDetail(readerDetail, readerId) {
    return {
        type: RECEIVE_READER_DETAIL,
        readerDetail,
        readerId
    };
}