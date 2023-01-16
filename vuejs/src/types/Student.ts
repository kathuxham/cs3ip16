import type Address from "./Address";
import type ContactPreferences from "./ContactPreferences";
import type DegreePart from "./DegreePart";
import type EmergencyContact from "./EmergencyContact";

export default interface Student {
    individualId: null;
    studentNumber: string;
    studentId: string;
    course: string;
    degreePart: DegreePart;
    courseRep: boolean;
    parentalResponsibility: boolean;
    termTimeAddress: Address;
    contactPreferences: ContactPreferences;
    emergencyContact: EmergencyContact;
}