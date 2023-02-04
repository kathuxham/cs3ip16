import Address from "./Address";
import Individual from "./Individual";

export default interface Student {
    id: null;
    studentId: string;
    studentNumber: string;
    studentUsername: string;
    programme: string;
    qualification: string;
    department: string;
    startDate: Date;
    expectedEndDate: Date;
    individual: Individual;
    individualId: string;
    termTimeAddress: Address;
}