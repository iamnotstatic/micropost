/**
 * EasyHttp Library
 * Library for making Http requests
 * 
 * @version 3.0.0
 * @author Abdulfatai Suleiman
 * @license MIT
 * 
 **/

class EasyHttp {
    // HTTP GET REQUEST
    async get(url){
        const response = await fetch(url);
        const resDate = await response.json();
        return resDate;
    }

    // HTTP POST REQUEST
    async post(url, data){
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }

    // HTTP PUT REQUEST
    async put(url, data){
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;

    }

    // HTTP DELETE REQUEST
    async delete(url){
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-tyep': 'application/json'
            }
        });
        const resData = await "Resource Deleted";
        return resData;
    }
}

export const http = new EasyHttp();