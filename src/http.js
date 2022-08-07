import axios from 'axios'
import qs from 'qs'

const baseParams = { 
    ts: process.env.VUE_APP_API_TS,
    apikey: process.env.VUE_APP_API_KEY,
    hash: process.env.VUE_APP_API_HASH
  }
 let instance = axios.create({
     baseURL: process.env.VUE_APP_API_BASE_URL,
     paramsSerializer: function (params) {
         return qs.stringify({ ...baseParams, ...params})
     }
 })
 
 const http = instance
 
 export {http}
 