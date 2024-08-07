export interface IFormData<DataType, ValidationType> {
    data: DataType | null;
    validation: ValidationType;
}

export interface IStudent {
    id: string;
    firstName: string;
    lastName: string;
    preferredName: string | null;
    preferredPronouns: string;
    notes: string | null;
}
export interface ITeam {
    teamNumber: number;
    nickname: string | null;
    table: number;
    section: number;
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
    id: string;
    team: ITeam;
    studentRecords: Array<IStudentRecord>
    timestamp: Date;
}
