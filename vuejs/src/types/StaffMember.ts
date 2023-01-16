import type User from "./User";

export default interface StaffMember {
    individualId: null;
    staffNumber: string;
    position: string;
    user: User
}