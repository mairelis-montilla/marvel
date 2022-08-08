import { http } from "@/http";

const baseUrl = '/characters'

export default{
  async getCharacters(params) {
    return await http.get(baseUrl, {params: params})
  }
}