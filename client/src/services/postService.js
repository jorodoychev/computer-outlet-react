import * as request from "../lib/request.js"

const BASE_URL = 'http://localhost:3030/jsonstore/computer-outlet/'

const getUrl = (id = '') => `${BASE_URL}${id}`

export const getAll = async () => {
    const response = await request.get(getUrl())
    return Object.entries(response).map(([id, {...data}]) => ({id, ...data}))
}

export const getOne = async id => {
    return await request.get(getUrl(id))
}

export const create = async data => {
    return await request.post(getUrl(), data)
}

export const edit = async (id, data) => {
    return await request.put(getUrl(id), data)
}

export const remove = async id => {
    return await request.remove(getUrl(id))
}
