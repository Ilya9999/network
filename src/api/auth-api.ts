import {instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from './api'

type GetAuthResponseDataType = {
    id:number
    email:string
    login:string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    getAuth () {
        return instance.get<APIResponseType<GetAuthResponseDataType>>(`auth/me`, {
        }).then(response => {
            return response.data
        })
    },

    login (email:string, password:string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha })
        .then(res => res.data)
    },

    logout () {
        //Не типизируем этот эндпоинт , потому что мы ничего не ждем от этого запроса 
        return instance.delete(`auth/login`)
    }
    
}
