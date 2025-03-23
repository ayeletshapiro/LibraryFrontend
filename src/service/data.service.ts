import axios from "axios";

 class DataService {
     getBooks() {
        return  axios.get("http://localhost:3000/api/books")
    }
}
export default new DataService
