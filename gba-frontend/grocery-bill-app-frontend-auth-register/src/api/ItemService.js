import axios from "axios";

const ITEM_API_BASE_URL = "http://localhost:8080/api/v1/items";


class ItemService {
  getItems() {
    return axios.get(ITEM_API_BASE_URL);
  }

  getItemById(id) {
    return axios.get(ITEM_API_BASE_URL + "/" + id);
  }
  insertItem(item) {
    return axios.post(ITEM_API_BASE_URL, item);
  }
  updateItem(item, id) {
    return axios.put(ITEM_API_BASE_URL + "/" + id, item);
  }
  deleteItem(id) {
    return axios.delete(ITEM_API_BASE_URL + "/" + id);
  }

}

export default new ItemService();
