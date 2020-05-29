export default async function API(endpoint, userObject = {}, method = 'GET') {
    const API_URL = 'http://localhost:3333';
    const fetchBody = {
        method: method,
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            username: userObject.user,
            password: userObject.password,
        }),
    };
    const data = await fetch(`${API_URL}/${endpoint}`, fetchBody);
    return data;
}