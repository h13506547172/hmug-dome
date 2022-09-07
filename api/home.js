import request from "@/utils/request.js"

export const getXXXAPI = () => {
  return request.get('/home/swiperdata')
}
export const getNavsAPI = () => {
  return request.get('/home/catitems')
}
export const getFloordataAPI = () => {
  return request.get('/home/floordata')
}
