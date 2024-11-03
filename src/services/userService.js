let url = process.env.url
const headers = {
    "Content-Type": "application/json",
}
export async function getUser(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/users/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function updateUser(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/users/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function changePassword(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/users/change-password`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}



