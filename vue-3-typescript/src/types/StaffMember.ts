import Address from "./Address";
import Individual from "./Individual";

export default interface StaffMember {
    staffMemberId: null;
    staffNumber: string;
    position: string;
    individual: Individual;
    individualId: string;
    homeAddress: Address;
}