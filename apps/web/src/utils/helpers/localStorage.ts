const prefix = "abuse_sleuth_";

export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(prefix+key, value)
}

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(prefix+key)
}

export const removeLocalStorage = (key: string) => {
    return localStorage.removeItem(prefix+key)
}
