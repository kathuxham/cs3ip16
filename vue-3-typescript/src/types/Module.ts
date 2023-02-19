import Assessment from "./Assessment";
import Individual from "./Individual";
import StaffMember from "./StaffMember";
import Student from "./Student";

export default interface Module {
    id: string;
    moduleId: string;
    moduleCode: string;
    moduleTitle: string;
    moduleLevel: number;
    moduleLink: string;
    numberOfCredits: number;
    termsTaught: string;
    currentAsOf: string;
    contactHours: number;
    assessments: Assessment[];
    moduleConvenor: StaffMember[];
    moduleConvenorIndividual: Individual;
    studentMod: Student[];
}