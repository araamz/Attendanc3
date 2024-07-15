export interface IStudent {
    id: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    pronouns: string;
}
export interface ITeam {
    assignedNumber: number | undefined;
    nickname: string;
    table: number | undefined;
    section: number | undefined;
    mentor: string;
    assignedStudents: Array<IStudent>;
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
