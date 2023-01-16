import http from "../http-common";

class IndividualDataService {
  getAll() {
    return http.get("/individuals");
  }

  get(id: string) {
    return http.get(`/individuals/${id}`);
  }

  create(data: any) {
    return http.post("/individuals", data);
  }

  update(id: string, data: any) {
    return http.put(`/individuals/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/individuals/${id}`);
  }

}

export default new IndividualDataService();