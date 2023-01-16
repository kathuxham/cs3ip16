import type Module from "module";

export default interface Examination {
    examId: null;
    module: Module;
    examCode: string;
    examWeighting: number;
    examDate: Date;
    examDuration: number;
    examRubric: string;
    retake: boolean;
}