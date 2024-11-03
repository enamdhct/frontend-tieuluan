let url = process.env.url
let token = localStorage.getItem('accessToken')
const headers = {
    "Content-Type": "application/json",
    "token": "Bearer "+token
}
export async function getAllCategory(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/categorys`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getCategory(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/categorys/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteCategory(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/categorys/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createCategory(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/categorys/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateCategory(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/categorys/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


