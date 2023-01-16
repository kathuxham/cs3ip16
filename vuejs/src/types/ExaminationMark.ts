import type Examination from "./Examination";
import type Student from "./Student";

export default interface ExaminationMark {
    examinationMarkId: null;
    examination: Examination;
    student: Student;
    examinationMark: number;
    examinationFeedback: string;
}