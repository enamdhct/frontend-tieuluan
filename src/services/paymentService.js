let url = process.env.url
const headers = {
    "Content-Type": "application/json",
}

export async function paymentVNP(data){
    try {
        let requestOptions = {
          method: 'POST',
          headers: headers,
          body: data
        };
    
        let url_api = `${url}/payments/create_payment_url`;
        const res = await fetch(url_api, requestOptions);
    
        if (!res.ok) {
          throw new Error(`Gọi API không thành công: ${res.status}`);
        }
    
        let urlPayment = await res.text();
        console.log(urlPayment);
        return urlPayment;
      } catch (error) {
        console.error('Lỗi khi gọi API paymentVNP', error);
        throw error;
      }
}