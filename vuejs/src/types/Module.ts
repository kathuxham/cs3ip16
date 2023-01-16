import type StaffMember from "./StaffMember";

export default interface Module {
    moduleId: null;
    moduleCode: string;
    moduleDescription: string;
    moduleLink: string;
    numberOfCredits: number;
    termsTaught: string;
    currentAsOf: number;
    moduleConvenor: StaffMember;
    contactHours: number;
}