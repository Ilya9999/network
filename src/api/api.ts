import  axios from 'axios'
import { follow } from '../redux/users-reducer'
import { PostsType, ContactsType, PhotosType, ProfileType } from '../Types/types'
import { type } from 'os'

const instance = axios.create ({

        withCredentials: true,
        baseURL:`https://social-network.samuraijs.com/api/1.0/`,
        headers: {
            'API-KEY': '17f7ab2b-d784-4911-a83d-3d0636885100'
        }

})

export enum ResultCodeEnum {
    Success = 0, 
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type GetAuthResponseType = {
    data:{
        id:number
        email:string
        login:string
    }
    resultCode:ResultCodeEnum
    messages:Array<string>
}

type LoginResponseType = {
    resultCode: ResultCodeEnum | ResultCodeForCaptcha 
    messages:Array<string>
    data:{
        userId: number
    }
}

export const authAPI = {
    getAuth () {
        return instance.get<GetAuthResponseType>(`auth/me`, {
        }).then(response => {
            return response.data
        })
    },

    login (email:string, password:string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
        .then(res => res.data)
    },

    logout () {
        return instance.delete<GetAuthResponseType>(`auth/login`)
    }
    
}

type GetCaptchaURLType = {
    url:string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaURLType>(`security/get-captcha-url`)
    }
}



export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
    },

    follow(userId:number) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId:number) {
        return instance.delete(`follow/${userId}`)
    },

    getProfile(userId:number) {
        if (!userId) {
            userId = 2
        }

        console.warn('Obsolete method , please use profileAPI object ')
        return profileAPI.getProfile(userId)
       
    }

}

export const profileAPI = {

    getProfile(userId:number) {
        if (!userId) {
            userId = 2
        }

        return instance.get(`profile/` + userId)
       
    }, 

    getStatus(userId:number) {
        return instance.get(`profile/status/` + userId)
    },

    updateStatus(status:string) {
        return instance.put(`profile/status/`, {status:status})
    },

    savePhoto(photoFile:any){
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfile(profile:ProfileType){
        return instance.put(`profile/`, profile)
    }

}



