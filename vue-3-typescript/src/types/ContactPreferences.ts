import type Student from "./Student";

export default interface ContactPreferences {
    contactPreferenceId: null;
    student: Student;
    textMessages: boolean;
    alumniSupporterEmails: boolean;
    careerEmails: boolean;
}