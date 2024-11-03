let url = process.env.url
const headers = {
    "Content-Type": "application/json",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDQ2ZTFkNDBlZTMzNjk4OWQ2ZTViZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDc5MTI0MSwiZXhwIjoxNjk3MzgzMjQxfQ.wY8aDxAKi01CunUgMN5eRz7NzPr2TpEc0fQez4AA4cE"
}
export async function getAllMember(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/members`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getMember(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/members/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteMember(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/members/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createMember(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/members/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateMember(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/members/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


