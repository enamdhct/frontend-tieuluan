let url = process.env.url
const headers = {
    "Content-Type": "application/json",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDQ2ZTFkNDBlZTMzNjk4OWQ2ZTViZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDc5MTI0MSwiZXhwIjoxNjk3MzgzMjQxfQ.wY8aDxAKi01CunUgMN5eRz7NzPr2TpEc0fQez4AA4cE"
}
export async function getWareHouse(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/warehouses/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getWareByProductID(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/getWareByProductID`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}