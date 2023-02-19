import type Student from "./Student";

export default interface Enrolment {
    enrolmentId: null;
    student: Student
    enrolmentComplete: boolean;
    stage1: boolean;
    stage2: boolean;
    stage3: boolean;
    stage4: boolean;
}