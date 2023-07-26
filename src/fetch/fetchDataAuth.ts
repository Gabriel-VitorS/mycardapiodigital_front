import router from "@/router";
import axios from "axios";
async function fetchDataAuth(method:'POST' | 'GET', url:string, data?: object | FormData ):Promise<Response>{

    const jwt = JSON.parse(sessionStorage.getItem('JWT')!)

    return await axios({
        method: method,
        headers: {Authorization: `bearer ${jwt.token}`},
        url: `${process.env.VUE_APP_URL_API}/${url}`,
        data: data
    }).then(function (response){
        return {
            data: response.data,
            code: response.request.status
        }
    }).catch(function (response){
        console.log(response)

        if(response.request.status == 401){
            router.push('/login')
            sessionStorage.removeItem('JWT')
        }

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

export default fetchDataAuth
