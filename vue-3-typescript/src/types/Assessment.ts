import AssessmentMark from "./AssessmentMark";
import type Module from "./Module";

export default interface Assessment {
    id: null;
    assessmentId: string;
    module: Module;
    moduleId: string;
    assessmentCode: string;
    assessmentDetail: string;
    assessmentType: string;
    assessmentWeight: number;
    assessmentMarks: AssessmentMark[];
}