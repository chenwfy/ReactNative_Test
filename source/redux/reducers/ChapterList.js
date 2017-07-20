import { FETCH_BOOK_CHAPTER_LIST, RECEIVE_BOOK_CHAPTER_LIST } from '../ActionType';

const initState = {
    status: {},
    listData: {}
};
export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_BOOK_CHAPTER_LIST:
            let book = action.bookId;
            return {
                ...state,
                status: {
                    ...state.status,
                    [book]: {
                        loading: true,
                        refreshing: (state.status && state.status[book] && (typeof state.status[book].refreshing === 'boolean')) ? state.status[book].refreshing : true,
                        noMore: (state.status && state.status[book] && (typeof state.status[book].noMore === 'boolean')) ? state.status[book].noMore : false
                    }
                }
            }
        case RECEIVE_BOOK_CHAPTER_LIST:
            const { bookId, chapterList } = action;
            const { recordCount, pageCount, pageIndex, list } = chapterList;
            const resultList = list || [];

            return {
                ...state,
                status: {
                    ...state.status,
                    [bookId]: {
                        loading: false,
                        refreshing: false,
                        noMore: pageIndex >= pageCount,
                        recordCount: recordCount,
                        pageCount: pageCount,
                        pageIndex: pageIndex
                    }
                },
                listData: {
                    ...state.listData,
                    [bookId]: pageIndex <= 1 ? resultList : (state.listData[bookId] || []).concat(resultList)
                }
            }
        default:
            return state;
    }
}