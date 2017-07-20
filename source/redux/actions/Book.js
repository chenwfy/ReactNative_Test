import {
    FETCH_BOOK_CATEGORY_LIST, RECEIVE_BOOK_CATEGORY_LIST,
    FETCH_BOOK_LIST, RECEIVE_BOOK_LIST,
    FETCH_BOOK_DETAIL, RECEIVE_BOOK_DETAIL,
    FETCH_BOOK_CHAPTER_LIST, RECEIVE_BOOK_CHAPTER_LIST
} from '../ActionType';
import * as Fetcher from '../../common/Fetcher';

//category
export function FetchCategoryList() {
    return dispatch => {
        dispatch(requestCategoryList());

        return Fetcher.fetcherBookCategoryList()
            .then((result) => {
                dispatch(receiverCategoryList(result));
            });
    };
}

function requestCategoryList() {
    return {
        type: FETCH_BOOK_CATEGORY_LIST
    };
}

function receiverCategoryList(categoryList) {
    return {
        type: RECEIVE_BOOK_CATEGORY_LIST,
        categoryList
    };
}

//book list
export function FetchBookList(category, pageIndex) {
    return dispatch => {
        dispatch(requestBookList(category));

        return Fetcher.fetcherBookList(category, pageIndex)
            .then((result) => {
                dispatch(receiverBookList(result, category));
            });
    };
}

function requestBookList(category) {
    return {
        type: FETCH_BOOK_LIST,
        category
    };
}

function receiverBookList(bookList, category) {
    return {
        type: RECEIVE_BOOK_LIST,
        bookList,
        category
    };
}

//book detail
export function FetchBookDetail(bookId) {
    return dispatch => {
        dispatch(requestBookDetail(bookId));

        return Fetcher.fetcherBookDetail(bookId)
            .then((detail) => {
                dispatch(receiverBookDetail(detail, bookId));
            });
    };
}

function requestBookDetail(bookId) {
    return {
        type: FETCH_BOOK_DETAIL,
        bookId
    };
}

function receiverBookDetail(bookDetail, bookId) {
    return {
        type: RECEIVE_BOOK_DETAIL,
        bookDetail,
        bookId
    };
}

//chapter list
export function FetchChapterList(bookId, pageIndex) {
    return dispatch => {
        dispatch(requestChapterList(bookId));

        return Fetcher.fetcherChapterList(bookId, pageIndex)
            .then((result) => {
                dispatch(receiverChapterList(result, category));
            });
    };
}

function requestChapterList(bookId) {
    return {
        type: FETCH_BOOK_CHAPTER_LIST,
        bookId
    };
}

function receiverChapterList(chapterList, bookId) {
    return {
        type: RECEIVE_BOOK_CHAPTER_LIST,
        chapterList,
        bookId
    };
}