import {instance, GetItemsType, APIResponseType} from './api'
import {profileAPI} from './profile-api'

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 5) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data)
    },

    follow(userId:number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },

    unfollow(userId:number) {
        //delete метод у аксиос не подразумивает возвращение чего-либо , поэтому используем Promise ,чтобы типизировать делит 
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    },

    getProfile(userId:number) {
        if (!userId) {
            userId = 2
        }

        console.warn('Obsolete method , please use profileAPI object ')
        return profileAPI.getProfile(userId)
       
    }

}