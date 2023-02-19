import http from "../http-common";

class AssessmentDataService {
  getAll() {
    return http.get("/assessments");
  }

  get(id: string) {
    return http.get(`/assessments/${id}`);
  }

  getAssessmentsByModule(id: string) {
    return http.get(`/assessments/?moduleId=${id}`);
  }

  create(data: any) {
    return http.post("/assessments", data);
  }

  update(id: string, data: any) {
    return http.put(`/assessments/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/assessments/${id}`);
  }

  findByTitle(title: string) {
    return http.get(`/assessments?moduleTitle=${title}`);
  }

}

export default new AssessmentDataService();