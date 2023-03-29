import type Student from "./Student";

export default interface EmergencyContact {
    emergencyContactId: null;
    student: Student;
    fullName: string;
    relationship: string;
    telephoneNumber: string;
}