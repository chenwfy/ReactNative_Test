import React, { AsyncStorage } from 'react-native';

export function SetItem(key, value) {
    if (key && value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }
}

export function MergeItem(key, value) {
    if (key && value) {
        return AsyncStorage.mergeItem(key, JSON.stringify(value));
    }
}

export function GetItem(key) {
    return AsyncStorage.getItem(key)
        .then(function (value) {
            return JSON.parse(value)
        });
}

export function GetItems(keys) {
    return AsyncStorage.multiGet(keys)
        .then(results => {
            return results.map(item => {
                return [item[0], JSON.parse(item[1])]
            })
        });
}

export function RemoveItem(key) {
    return AsyncStorage.removeItem(key);
}

export function RemoveItems(keys) {
    return AsyncStorage.multiRemove(keys);
}

export function Clear(keys) {
    return AsyncStorage.clear();
}