import { useState, useEffect } from "react"


/*  
    function works like set state hooks
    works by getting value from local storage otherwise
    fall back to default value. first obtain json value from local storage
    by using the passed in key. if json value is not empty then parse the json
    and return the data. otherwise use default value and check if its a function or not.
    uses useEffect to update values whenever key or values change by setting the item
    to local storage and changing our value to json. returns value
*/
export function useLocalStorage(key, defaultvalue) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if(typeof defaultvalue === "function") {
            return defaultvalue()
        } else {
            return defaultvalue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])


    return [value, setValue]
}