import http from "../http-common";

class AssessmentMarksDataService {
  getAll() {
    return http.get("/assessmentmarks");
  }

  get(id: string) {
    return http.get(`/assessmentmarks/${id}`);
  }

  getByAssessment(id: string) {
    return http.get(`/assessmentmarks/?assessmentId=${id}`);
  }

  getByStudent(id: string) {
    return http.get(`/assessmentmarks/?studentId=${id}`);
  }

  create(data: any) {
    return http.post("/assessmentmarks", data);
  }

  update(id: string, data: any) {
    return http.put(`/assessmentmarks/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/assessmentmarks/${id}`);
  }

  findByTitle(title: string) {
    return http.get(`/assessmentmarks?moduleTitle=${title}`);
  }

}

export default new AssessmentMarksDataService();