import http from "../http-common";

class ModuleDataService {
  getAll() {
    return http.get("/modules");
  }

  get(id: string) {
    return http.get(`/modules/${id}`);
  }

  create(data: any) {
    return http.post("/modules", data);
  }

  update(id: string, data: any) {
    return http.put(`/modules/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/modules/${id}`);
  }

  findByTitle(title: string) {
    return http.get(`/modules?moduleTitle=${title}`);
  }

}

export default new ModuleDataService();