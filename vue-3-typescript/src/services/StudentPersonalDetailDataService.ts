import http from "../http-common";

class PersonalDetailDataService {
  getAll() {
    return http.get("/studentPersonalDetails");
  }

  get(id: string) {
    return http.get(`/studentPersonalDetails/?studentId=${id}`);
  }

  create(data: any) {
    return http.post("/studentPersonalDetails", data);
  }

  update(id: string, data: any) {
    return http.put(`/studentPersonalDetails/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/studentPersonalDetails/${id}`);
  }

  findByTitle(title: string) {
    return http.get(`/studentPersonalDetails?studentNumber=${title}`);
  }

}

export default new PersonalDetailDataService();