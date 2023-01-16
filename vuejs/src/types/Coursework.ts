import type Module from "module";

export default interface Coursework {
    courseworkId: null;
    module: Module;
    courseworkCode: string;
    courseworkTitle: string;
    typeOfAssignment: string;
    individualOrGroup: string;
    courseworkWeighting: number;
    dateReleased: Date;
    dateDue: Date;
    dateMarksReleased: Date;
}