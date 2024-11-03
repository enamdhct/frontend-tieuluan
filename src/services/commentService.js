let url = process.env.url
const headers = {
    "Content-Type": "application/json",
}
export async function getAllComment(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/comments`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getCommentProduct(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/comments/getCommentProduct/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


export async function getComment(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/comments/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteComment(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/comments/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createComment(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/comments/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function repComment(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/comments/reply/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function deleteRepComment(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/comments/deleteReply/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateComment(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/comments/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}



