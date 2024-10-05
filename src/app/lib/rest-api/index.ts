export  async function postRequest(payload:any, endPoint:string){

    const formData = new FormData()

    for(let prop in payload){
        formData.append(prop, payload[prop])
    }

    try {
        
        const response = await fetch(endPoint, {
          method: 'POST',
          body: formData,
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            return {success: false, msg: 'Response not OK'};
        }

    } catch (error:any) {
        return {success: false, msg: error.msg};
    }
   
}

export  async function getRequest(endPoint:string){

    try {
        const response = await fetch(endPoint, {
            method: 'GET'
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            throw new Error('Error retrieving info')
        }

    } catch (error) {
        throw new Error('Error retrieving info - ' +error)
    }
}