import type Module from "./Module";
import type Student from "./Student";

export default interface DegreePart {
    degreePart: null;
    degreeCode: string;
    modules: Module[];
    courseReps: Student[];
}