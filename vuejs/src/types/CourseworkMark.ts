import type Coursework from "./Coursework";
import type Student from "./Student";

export default interface CourseworkMark {
    courseworkMarkId: null;
    coursework: Coursework;
    student: Student;
    courseworkMark: number;
    courseworkFeedback: string;
}