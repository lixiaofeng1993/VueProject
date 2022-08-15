import { message } from 'ant-design-vue'
import axios from 'axios'
import router from '../router'

const request = axios.create({
    timeout: 5000,
})

request.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token')
    // console.log(token)
    if (token) {
        config.headers = {
            ...config.headers,
            ...{
                "Authorization": "Bearer " + token
            },
        }
    }
    return config
})

request.interceptors.response.use(
    (res) => {
        return res.data
    }, (e) => {
        console.log("请求后置报错===>>>", e.response.data);
        if (e.response.data.detail.code) {
            message.error(e.response.data.detail.message)
        } else {
            message.error(e.response.data.detail)
        }
        router.push("/login")
        return Promise.reject(e.response.data.detail.message)
    }
)

export default request;