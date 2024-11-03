let url = process.env.url
let token = localStorage.getItem('accessToken')

const headers = {
    "Content-Type": "application/json",
    "token": "Bearer "+token
}
export async function getAllOrder(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/orders`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getOrder(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/orders/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getOrderUser(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/orders/userOrder/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteOrder(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/orders/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createOrder(data){
    console.log(headers)
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/orders/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateOrder(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/orders/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


