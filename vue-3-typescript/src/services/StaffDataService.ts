import http from "../http-common";

class StaffDataService {
  getAll() {
    return http.get("/staffMembers");
  }

  get(id: string) {
    return http.get(`/staffMembers/${id}`);
  }

  create(data: any) {
    return http.post("/staffMembers", data);
  }

  update(id: string, data: any) {
    return http.put(`/staffMembers/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/staffMembers/${id}`);
  }

}

export default new StaffDataService();