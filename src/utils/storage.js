
export const getItem = (key) => {
    if (key) {
        const item = localStorage.getItem(key)
        if (item) return JSON.parse(item)?.payload
        return item
    }
    return null
};

export const setItem = (key, payload) => {
    if (key, payload) {
        console.log('setItem', key, payload)
        localStorage.setItem(key, JSON.stringify({ payload: payload }))
        return true
    }
    return false
};
