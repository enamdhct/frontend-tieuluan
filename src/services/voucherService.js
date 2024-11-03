let url = process.env.url
let token = window.localStorage.getItem('accessToken')
const headers = {
    "Content-Type": "application/json",
    "token": "Bearer "+token
}
export async function getAllVoucher(page =1){
    let requestOptions = {
        method: 'POST',
        headers: headers
    }
    let url_api = `${url}/vouchers/all?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function saveVoucherToUser(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    console.log({requestOptions});
    
    let url_api = `${url}/vouchers/saveToUser`;
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getVoucher(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/vouchers/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getVoucherUser(userId){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/vouchers/user/${userId}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


export async function deleteVoucher(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/vouchers/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createVoucher(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/vouchers/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateVoucher(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/vouchers/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


