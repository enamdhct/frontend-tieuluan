const headers = {
    "Content-Type": "application/json",
}

export async function question(text){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: text
    }
    console.log({requestOptions});
    
    let url_api = "http://127.0.0.1:3006/chatbot/v3"
    const res = await fetch(url_api, requestOptions)
    console.log({res});
    
    return await res.json()
}