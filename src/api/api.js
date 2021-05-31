import * as axios from 'axios'

const instance = axios.create ({

        withCredentials: true,
        baseURL:`https://social-network.samuraijs.com/api/1.0/`,
        headers: {
            'API-KEY': '17f7ab2b-d784-4911-a83d-3d0636885100'
        }

})

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
    }
}



