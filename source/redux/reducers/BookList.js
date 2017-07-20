import { FETCH_BOOK_LIST, RECEIVE_BOOK_LIST } from '../ActionType';

const initState = {
    status: {},
    listData: {}
};
export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_BOOK_LIST:
            let cate = action.category;
            return {
                ...state,
                status: {
                    ...state.status,
                    [cate]: {
                        loading: true,
                        refreshing: (state.status && state.status[cate] && (typeof state.status[cate].refreshing === 'boolean')) ? state.status[cate].refreshing : true,
                        noMore: (state.status && state.status[cate] && (typeof state.status[cate].noMore === 'boolean')) ? state.status[cate].noMore : false
                    }
                }
            }
        case RECEIVE_BOOK_LIST:
            const { category, bookList } = action;
            const { recordCount, pageCount, pageIndex, list } = bookList;
            const resultList = list || [];

            return {
                ...state,
                status: {
                    ...state.status,
                    [category]: {
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
                    [category]: pageIndex <= 1 ? resultList : (state.listData[category] || []).concat(resultList)
                }
            }
        default:
            return state;
    }
}