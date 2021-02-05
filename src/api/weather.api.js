import { http } from './http'

const baseUrl = 'https://api.openweathermap.org/data/2.5/'

const getUrl = (url) => {
  return `${baseUrl}${url}`
}

export const getWeatherData = async (params = {}) => {
  const { data } = await http.get(getUrl('weather'), { params })
  return data
}
