import axios from "axios";

 class DeveloperService {
    getDeveloperDetails() {
        return axios.get("https://randomuser.me/api/")
    }
}
export default new DeveloperService