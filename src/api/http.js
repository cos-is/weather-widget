import axios from 'axios'

const defaultRequestSettings = {
  appid: process.env.VUE_APP_API_KEY,
  units: 'metric'
}

const config = {}

const http = axios.create(config)
http.interceptors.request.use((req) => {
  req.params = { ...defaultRequestSettings, ...req.params }
  return req
})

export {
  http
}
