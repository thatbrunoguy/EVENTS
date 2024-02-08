import axios from "axios";
import { Login, Register } from "../types";

const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;
const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL || "";

class AuthService {
  /**
   * Get all posts
   * @returns
   */
  //   getAllPosts() {
  //     return axios.get(BASE_URL);
  //   }

  /**
   * Get By Id
   * @returns
   */
  //   getByPostId() {
  //     return axios.get(BASE_URL);
  //   }

  /**
   *To Add a Post
   * @returns
   */
  async login(data: Login) {
    const res = await axios.post(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-APP-KEY": APP_KEY,
      },
    });
    return res;
  }

  /**
   *To Add a Post
   * @returns
   */
  async register(data: Register) {
    const res = await axios.post(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-APP-KEY": APP_KEY,
      },
    });
    return res;
  }

  /**
   *To Update a Post
   * @returns
   */
  //   async updatePost() {
  //     const res = await axios.put(
  //       BASE_URL,
  //       {
  //         method: "PUT",
  //         body: JSON.stringify({
  //           id: 1,
  //           title: "foo",
  //           body: "bar",
  //           userId: 1,
  //         }),
  //         headers: {
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       }
  //     );
  //     return res;
  //   }

  /**
   *To Delete a Post
   * @returns
   */
  //   async deletePost() {
  //     const res = await axios.delete(
  //       BASE_URL,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     return res;
  //   }
}
const authServiceInstance = new AuthService();

export { authServiceInstance };
