export interface IStudent {
    id: string;
    firstName: string;
    lastName: string;
    pronouns: string;
}
export interface ITeam {
    teamNumber: number;
    teamNickname: string;
    table: string;
    section: string;
    mentor: string;
}

export interface IRubricSlice {
    id: string;
    score: number;
    label: string;
    description: string;
}
export interface IRubric {
    label: string;
    commonDeductions: Array<string>;
    slices: Array<IRubricSlice>
}

export interface IRubricGrade {
    rubric: IRubric;
    earnedSlice: IRubricSlice;
    commonDeductionsSelections: Array<string>;
    comment: string;
}

export interface IStudentRecord {
    student: IStudent;
    rubricGrade: Array<IRubricGrade>;
}

export interface IRecord {
    team: ITeam;
    studentRecords: Array<IStudentRecord>
    timestamp: Date;
}
