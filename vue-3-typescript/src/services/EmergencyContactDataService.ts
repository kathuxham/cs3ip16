import http from "../http-common";

class EmergencyContactDataService {
  getAll() {
    return http.get("/emergencycontacts");
  }

  get(id: string) {
    return http.get(`/emergencycontacts/?studentId=${id}`);
  }

  create(data: any) {
    return http.post("/emergencycontacts", data);
  }

  update(id: string, data: any) {
    return http.put(`/emergencycontacts/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/emergencycontacts/${id}`);
  }

  findByTitle(title: string) {
    return http.get(`/emergencycontacts?studentNumber=${title}`);
  }

}

export default new EmergencyContactDataService();