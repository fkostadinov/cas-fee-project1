class HttpService {

    /**
     * 
     * @param {*} method the HTTP method, e.g. GET/POST/PUT/DELETE
     * @param {*} url the url endpoing, e.g. /api/todos/:id
     * @param {*} data the body data to send to the server
     * @param {*} headers some headers (if any). If none are provided, this method will set Content-Type to application/json by default
     * @returns a promise that will resolve to a JSON string
     */
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
      
        return fetch(url, {
            method: method,
            headers: fetchHeaders,
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        });
    }

}