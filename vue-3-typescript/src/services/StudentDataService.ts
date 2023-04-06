import http from "../http-common";

class StudentDataService {
  getAll() {
    return http.get("/students");
  }

  get(id: string) {
    return http.get(`/students/${id}`);
  }

  create(data: any) {
    return http.post("/students", data);
  }

  update(id: string, data: any) {
    return http.put(`/students/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/students/${id}`);
  }
}

export default new StudentDataService();