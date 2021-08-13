import axios from 'axios';

const baseURL = "https://aws.nicegoodthings.com/";
const config = {
    method: 'post',
    baseURL: baseURL,
    timeout: 36000,
    responseType: 'json'
};


export function createUserRequest(uuid, nickname='') {
    let localConfig = Object.assign({}, config, {
        data: {
            userId: uuid,
            nickname: nickname,
        },
        url: '/user'
    });
    return axios.request(localConfig);
}