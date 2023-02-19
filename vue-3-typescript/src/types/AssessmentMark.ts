import type Assessment from "./Assessment";
import type Student from "./Student";

export default interface AssessmentMark {
    assessmentMarkId: null;
    assessment: Assessment;
    assessmentId: string;
    student: Student;
    assessmentStatus: string;
    assessmentMark: number;
    assessmentGrade: string;
    assessmentState: string;
    assessmentDate: Date;
    assessmentLevel: number;
}