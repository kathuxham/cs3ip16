import type Student from "./Student";

export default interface StudentPersonalDetails {
    personalDetailsId: null;
    student: Student;
    nationality: string;
    domicile: string;
    countryOfBirth: string;
    ethnicity: string;
    feeStatus: string;
    disability: string;
    parentalResponsibility: boolean;
}