import {post, remove} from '../lib/request'

const BASE_URL = 'http://localhost:3030/users'
const ACCESS_TOKEN_KEY = 'accessToken'

const handleRequestError = (error) => {
    throw new Error(error.message)
}

const authenticate = async (endpoint, credentials) => {
    try {
        const response = await post(`${BASE_URL}/${endpoint}`, credentials)
        localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
        return response
    } catch (error) {
        return handleRequestError(error)
    }
}

export const login = (email, password) => authenticate('login', {email, password})


export const register = (username, email, password) => authenticate('register', {
    username,
    email,
    password
})

export const logout = async () => {
    try {
        await remove(`${BASE_URL}/logout`)
        localStorage.removeItem(ACCESS_TOKEN_KEY)
    } catch (error) {
        return handleRequestError(error)
    }
}
