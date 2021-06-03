import * as axios from 'axios'

const instance = axios.create ({

        withCredentials: true,
        baseURL:`https://social-network.samuraijs.com/api/1.0/`,
        headers: {
            'API-KEY': '17f7ab2b-d784-4911-a83d-3d0636885100'
        }

})

export const authAPI = {
    getAuth () {
        return instance.get(`auth/me`, {
        }).then(response => {
            return response.data
        })
    }
    
}

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
    }
}

export const profileAPI = {
    
    getProfile(userId) {
        if (!userId) {
            userId = 2
        }

        return instance.get(`profile/` + userId)
       
    }
}


