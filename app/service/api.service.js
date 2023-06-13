import axios from 'axios'
import Utils from "./auth/auth-service";



let TOKEN = null;
if (Utils.getToken()) {
    try {
        let NewToken = Utils.getToken()
        if (typeof (NewToken) !== "undefined") {
            TOKEN = NewToken
        }
    } catch (err) {
        TOKEN = ""
    }
}

let headers = {
    "X-Shopify-storefront-Access-Token": Utils.getToken() ?? TOKEN
}


const AxiosInstance = axios.create({
    baseURL: "https://bateeqshop.myshopify.com" || window.origin,
    headers: {
        ...headers,
    },
})

AxiosInstance.isCancel = axios.isCancel;

AxiosInstance.interceptors.response.use(
    (res) =>
        new Promise((resolve, reject) => {
            if (res.data.error === 'Unauthorized') {
            } else {
                resolve(res)
            }
        }),
    (err) => {
        if (!err.response) {
            return new Promise((resolve, reject) => {
                reject({...err})
            })
        }
        if (err.response.status === 401) {
            return new Promise((resolve, reject) => {
                reject(err)
            })
            // store.dispatch(signOut())
        } else {
            return new Promise((resolve, reject) => {
                reject({...err?.response?.data})
            })
        }
    }
)

const AxiosAdmin = axios.create({
    baseURL: ["https://bateeqshop.myshopify.com",'/admin'].join('') || window.origin,
    headers: {
        ...headers,
    },
})

AxiosAdmin.isCancel = axios.isCancel;

AxiosAdmin.interceptors.response.use(
    (res) =>
        new Promise((resolve, reject) => {
            if (res.data.error === 'Unauthorized') {
            } else {
                resolve(res)
            }
        }),
    (err) => {
        if (!err.response) {
            return new Promise((resolve, reject) => {
                reject({...err})
            })
        }
        if (err.response.status === 401) {
            return new Promise((resolve, reject) => {
                reject(err)
            })
            // store.dispatch(signOut())
        } else {
            return new Promise((resolve, reject) => {
                reject({...err?.response?.data})
            })
        }
    }
)


export class ApiService{
    /**
     *
     * @param {object} props
     * @param {string} props.url
     * @param {string | "storefront" | "admin"} props.mode
     * @param {object | string | {} | ""} props.query
     * @param {object | string | boolean | Array | []} props.body
     * @param {object} props.config
     * @param {Object | {}} props.config.headers
     * @param {Object | {}} props.config.params
     */
    constructor(props) {
        this.url = props?.url ?? '/'
        this.mode = props?.mode ?? "storefront"
        this.body = props?.body ?? ""
        this.config = {
            ...props?.config,
            params:props?.config?.params ?? {},
            headers:  {
                ...props?.config?.headers,
                // 'Authorization': props?.config?.headers?.Authorization ?? `Bearer ${Utils.getToken()}`
            }
        }
        switch (this.mode){
            case "storefront":
                Reflect.set(this.config.headers,'X-Shopify-storefront-Access-Token',Utils.getToken())
                break;
            case "admin":
                Reflect.set(this.config.headers,'X-Shopify-Access-Token',Utils.getToken())
                break;
            default:
                Reflect.set(this.config.headers,'X-Shopify-storefront-Access-Token',Utils.getToken())
                break;
        }
        this.http =  AxiosAdmin
        // this.http = this.mode  === 'admin' ? AxiosAdmin : AxiosInstance
    }
    /**
     * @method get()
     * @returns {Promise<T|[any,null]>}
     */
    async get(){
        try {
            return await this.http.get(this.url,{
                ...this.config
            })
                .then((response)=> {
                    let data = response?.data
                    return [null , response?.data]
                })
                .catch((err)=> {
                    return [ err, null ]
                })
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @method patch()
     * @returns {Promise<T|[any,null]|*[]>}
     */
    async patch(){
        try{
            return await this.http.patch(this.url,this.body,{
                ...this.config
            })
                .then((response)=> {
                    let data = response?.data
                    return [null , response?.data]
                })
                .catch((err)=> {
                    return [ err, null ]
                })
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @method post()
     * @returns {Promise<T|[any,null]|*[]>}
     */
    async post(){
        try{
            return await this.http.post(this.url,this.body,{
                ...this.config
            })
                .then((response)=> {
                    return [null , response?.data]
                })
                .catch((err)=> {
                    return [ err, null ]
                })
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @method put()
     * @returns {Promise<T|[any,null]|*[]>}
     */
    async put(){
        try{
            return await this.http.put(this.url,this.body,{
                ...this.config
            })
                .then((response)=> {
                    return [ null, response?.data]
                })
                .catch((err)=> {
                    return [ err ,null ]
                })
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @method delete()
     * @returns {Promise<T|[any,null]|*[]>}
     */
    async delete(){
        try{
            return await this.http.delete(this.url, {
                ...this.config
            })
                .then((response)=> {
                    let data = response?.data
                    return [ null, data ]
                })
                .catch((err)=> {
                    return [ err, null ]
                })
        }catch(err){
            return [ err, null ]
        }
    }
}

export { AxiosInstance , AxiosAdmin }
