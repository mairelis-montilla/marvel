import { http } from "@/http";

const baseUrl = '/characters'

export default{
  async getCharacters() {
    return await http.get(baseUrl, {params: { limit: 2}})
  }
}