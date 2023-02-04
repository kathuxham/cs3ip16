import http from "../http-common";

class AddressDataService {
  getAll() {
    return http.get("/addresses");
  }

  get(id: string) {
    return http.get(`/addresses/${id}`);
  }

  getHome(id: string) {
    return http.get(`/addresses/?individualId=${id}`);
  }

  getTermTime(id: string) {
    return http.get(`/addresses/?studentId=${id}`);
  }

  create(data: any) {
    return http.post("/addresses", data);
  }

  update(id: string, data: any) {
    return http.put(`/addresses/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/addresses/${id}`);
  }

  findByTitle(title: string) {
    return http.get(`/addresses?addressLine1=${title}`);
  }

}

export default new AddressDataService();