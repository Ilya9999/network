import  axios from 'axios'
import { type } from 'os'
import { UserType } from '../Types/types'

export const instance = axios.create ({

        withCredentials: true,
        baseURL:`https://social-network.samuraijs.com/api/1.0/`,
        headers: {
            'API-KEY': '17f7ab2b-d784-4911-a83d-3d0636885100'
        }

})

// Метод enum позволяет хранить значения под более понятными текстовыми ключами 
//Это позволяет сделать код более понятным , например ResultCodeEnum.Success вместо resultCode === 0 
export enum ResultCodeEnum {
    Success = 0, 
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}


//Common type for getting items
export type GetItemsType = {
    items:Array<UserType>
    totalCount:number
    error: null | string
}


//Респонс - это общий ответ для всех запросов , для дженериков используем значения по умолчанию потому , что это самые распространенные значения , они немного отличаются только в логине 
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data:D
    messages:Array<string>
    resultCode: RC
}







