const headers = {
    "Content-Type": "application/json",
    "Token": "3269de05-83c4-11ee-a59f-a260851ba65c"
}

export async function getAllProvince(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province'
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getAllDistrict(id){
    var raw = JSON.stringify({
        "province_id": parseInt(id)
      });
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
    }
    let url_api = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district'
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getAllWard(id){
    var raw = JSON.stringify({
        "district_id": parseInt(id)
      });
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
    }
    let url_api = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id'
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getServiceDelivery(id){
    var raw = JSON.stringify({
        "shop_id": 4700332,
        "from_district": 2054,
        "to_district": parseInt(id)
    });
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
    }
    let url_api = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services'
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getFeeDelivery(data){

    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data,
    }
    let url_api = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee'
    const res = await fetch(url_api, requestOptions)
    return res.json()
}