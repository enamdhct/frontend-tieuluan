let url = process.env.url
const headers = {
    "Content-Type": "application/json"
}

export async function Login(data){
    // console.log(data)
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    // console.log(requestOptions);
    let url_api = `${url}/auth/login`
    const res = await fetch(url_api, requestOptions)
    // console.log(res);
    return res.json()
}

export async function Register(data){
    let requestOptions = {
        method: 'POST',
        body: data,
        headers: headers
    }
    console.log(data)
    let url_api = `${url}/auth/register`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}