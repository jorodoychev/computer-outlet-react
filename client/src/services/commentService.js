import * as request from '../lib/request'

const baseUrl = 'http://localhost:3030/data/comments'

export const getAll = async (postId) => {
    const query = new URLSearchParams({
        where: `postId="${postId}"`,
        load: `owner=_ownerId:users`,
    })

    return await request.get(`${baseUrl}?${query}`);
}

export const create = async (postId, text) => {
    return await request.post(baseUrl, {
        postId,
        text,
    })
}
