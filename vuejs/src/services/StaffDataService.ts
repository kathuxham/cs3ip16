import http from "../http-common";

class StaffMemberDataService {
  getAll() {
    return http.get("/staffMember");
  }

  get(id: string) {
    return http.get(`/staffMember/${id}`);
  }

  create(data: any) {
    return http.post("/staffMember", data);
  }

  update(id: string, data: any) {
    return http.put(`/staffMember/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/staffMember/${id}`);
  }

  findById(id: string) {
    return http.get(`/staffMember?staffNumber=${id}`);
  }
}

export default new StaffMemberDataService();