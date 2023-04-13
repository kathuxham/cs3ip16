import http from "../http-common";

class ContactPreferencesDataService {
  getAll() {
    return http.get("/contactpreferences");
  }

  get(id: string) {
    return http.get(`/contactpreferences/?studentId=${id}`);
  }

  create(data: any) {
    return http.post("/contactpreferences", data);
  }

  update(id: string, data: any) {
    return http.put(`/contactpreferences/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/contactpreferences/${id}`);
  }

}

export default new ContactPreferencesDataService();