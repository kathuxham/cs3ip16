import type Module from "./Module";

export default interface Assessment {
    assessmentId: null;
    module: Module;
    assessmentCode: string;
    assessmentDetail: string;
    assessmentType: string;
    assessmentWeight: number;
}