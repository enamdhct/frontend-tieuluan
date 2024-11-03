let url = process.env.url
const headers = {
    "Content-Type": "application/json",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDQ2ZTFkNDBlZTMzNjk4OWQ2ZTViZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NzM4NjE0NCwiZXhwIjoxNjk5OTc4MTQ0fQ._MG9yuhAA1cnIef02oa-eU755b4qrbBs9Ju5D7Hh6JU"
}

export async function getAllProduct(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/products`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getAll(){
    let requestOptions = {
        method: 'POST',
        headers: headers
    }
    let url_api = `${url}/products/all`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getBestProduct(){
    let requestOptions = {
        method: 'POST',
        headers: headers
    }
    let url_api = `${url}/products/getBestProduct`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getAllProductWithCategory(id){
    if (id === 'all'){
        let requestOptions = {
            method: 'GET',
            headers: headers
        }
        let url_api = `${url}/products`
        const res = await fetch(url_api, requestOptions)
        return res.json()

    } else {
        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "categoryID": id
            })
        }
        let url_api = `${url}/products/getProductCategory/`
        const res = await fetch(url_api, requestOptions)
        return res.json()
    }
}

export async function searchProductName(text){
    console.log(text);
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "text": text
        })
    }
    let url_api = `${url}/products/search`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getProduct(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/products/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
    // try {
    //     let requestOptions = {
    //       method: 'GET',
    //       headers: headers
    //     };
    //     let url_api = `${url}/products/${id}`;
    //     const res = await fetch(url_api, requestOptions);
    
    //     if (!res.ok) {
    //       throw new Error(`Error fetching product: Status ${res.status}`);
    //     }
    
    //     const data = await res.json();
    //     return data;
    //   } catch (error) {
    //     console.error('Error in getProduct:', error);
    //     throw error; 
    //   }
}

export async function deleteProduct(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/products/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createProduct(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/products/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateProduct(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/products/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


