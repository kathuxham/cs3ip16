import Address from "./Address";
import Individual from "./Individual";
import Module from "./Module";
import Student from "./Student";

export default interface StaffMember {
    id: null;
    staffMemberId: string;
    staffNumber: string;
    position: string;
    individual: Individual;
    individualId: string;
    homeAddress: Address;
    staffConvenor: Module[];
    academicTutor: Student[];
}