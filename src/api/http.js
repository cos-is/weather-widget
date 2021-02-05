import axios from 'axios'

const defaultRequestSettings = {
  appid: '73e502f8d35943e7ff6ca686630cb29e',
  units: 'metric'
}

const config = {}

const http = axios.create(config)
// http.defaults.params =
http.interceptors.request.use((req) => {
  console.log({ ...req })
  req.params = { ...defaultRequestSettings, ...req.params }
  return req
})

export {
  http
}
