import request from "@/utils/request.js"

export const getGoodListAPI = (data) => {
  return request.get('/goods/search', data)
}
