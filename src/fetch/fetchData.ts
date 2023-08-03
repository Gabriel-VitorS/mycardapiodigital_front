import axios from "axios";

async function fetchData(method:'POST' | 'GET', url:string, data?: object | FormData ):Promise<Response>{
    return await axios({
        method: method,
        url: `${process.env.VUE_APP_URL_API}/${url}`,
        data: data
    }).then(function (response){
        return {
            data: response.data,
            code: response.request.status
        }
    }).catch(function (response){
        console.log(response)
        return {
            data: response.message,
            code: response.request.status
        }
    })
}

interface Response{
    data: string | object | any,
    code: number
}

export default fetchData