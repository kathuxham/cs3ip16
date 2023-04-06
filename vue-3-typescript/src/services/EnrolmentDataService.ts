import http from "../http-common";

class EnrolmentDataService {
  getAll() {
    return http.get("/enrolments");
  }

  get(id: string) {
    return http.get(`/enrolments/?studentId=${id}`);
  }

  create(data: any) {
    return http.post("/enrolments", data);
  }

  update(id: string, data: any) {
    return http.put(`/enrolments/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/enrolments/${id}`);
  }

}

export default new EnrolmentDataService();