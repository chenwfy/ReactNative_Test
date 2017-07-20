//import ProtoBuf from 'react-native-protobuf';
//import { ProtoContent } from './Proto';

const apiDomain = 'http://192.168.8.151:8095/Service';
const timeout = 60000;

function filterStatus(res) {
    if (res.ok) {
        return res;
    } else {
        throw new Error('server handle error');
    }
}

function filterJSON(res) {
    try {
        return res.text();
    } catch (e) {
        throw new Error('data format error');
    }
}

function filterData(result) {
    try {
        return (JSON.parse(result)).data;
    } catch (e) {
        throw new Error(e);
    }
}

function filterPageData(result) {
    try {
        let json = JSON.parse(result);
        return {
            recordCount: ~~(json.recorCount),
            pageCount: ~~(json.pageCount || 1),
            pageSize: ~~(json.pageSize || 10),
            pageIndex: ~~~~(json.pageIndex || 1),
            list: json.data || []
        }
    } catch (e) {
        throw new Error(e);
    }
}

function timeoutFetch(ms, promise) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("fetch time out"));
        }, ms);
        promise.then(
            (res) => {
                clearTimeout(timer);
                resolve(res);
            },
            (err) => {
                clearTimeout(timer);
                reject(err);
            }
        );
    })
}

function fetcherGet(url) {
    url = apiDomain + url;
    return timeoutFetch(timeout, fetch(url))
        .then(filterStatus)
        .then(filterJSON)
        .catch(function (error) {
            throw error;
        });
}

function fetcherPost(url, body) {
    url = apiDomain + url;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    return timeoutFetch(timeout, fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body) }))
        .then(filterStatus)
        .then(filterJSON)
        .catch(function (error) {
            throw error;
        });
}

export function fetcherTodaySentence() {
    // let serviceUrl = 'http://192.168.9.48:8095/Data';
    // let proto = ProtoBuf.loadProto(ProtoContent);
    // let requestBase = proto.build('RequestBase');
    // let request = new requestBase({ Command: 'Material.TodaySentence' });    
    // let respondBase = proto.build('RespondBase');
    // return timeoutFetch(timeout, fetch(serviceUrl, { method: 'POST', headers: { 'Content-Type': 'arraybuffer' }, body: request.toArrayBuffer() }))
    //     .then(function(response){
    //         return response.arrayBuffer();
    //     })
    //     .then(function(buffer){
    //         let respondData = respondBase.decode(buffer);
    //         let respondMessage = 'SentenceList';
    //         let json = respondMessage ? (respondData.Data ? protoBuf.build(respondMessage).decode(respondData.Data).encodeJSON() : '{}') : respondData.encodeJSON();
            
    //         console.debug('json ============');
    //         console.debug(json);
            
    //         let result = JSON.parse(json);
    //         return result;
    //     })
    //     .catch(function (error) {
    //         throw error;
    //     });
    return fetcherGet('/TodaySentence').then(filterData);
}

export function fetcherReaderList(category, pageIndex) {
    let condition = { ParentId: category, PageSize: 10, PageIndex: pageIndex };
    return fetcherPost('/ReaderList', condition).then(filterPageData);
}

export function fetcherReaderDetail(id) {
    return fetcherGet('/ReaderDetail/' + id).then(filterData);
}

export function fetcherBookCategoryList() {
    return fetcherGet('/BookCategoryList').then(filterData);
}

export function fetcherBookList(category, pageIndex) {
    let condition = { ParentId: category, PageSize: 10, PageIndex: pageIndex };
    return fetcherPost('/BookList', condition).then(filterPageData);
}

export function fetcherBookDetail(id) {
    return fetcherGet('/BookDetail/' + id).then(filterData);
}

export function fetcherChapterList(bookId, pageIndex) {
    let condition = { ParentId: bookId, PageSize: 10, PageIndex: pageIndex };
    return fetcherPost('/ChapterList', condition).then(filterPageData);
}