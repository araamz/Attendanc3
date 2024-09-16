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
    id: string;
    label: string;
    commonDeductions: Array<string>;
    slices: Array<IRubricSlice>
}
export interface IRubricGroup {
    id: string;
    label: string;
    rubrics: Array<IRubric>;
}

export interface IRubricGrade {
    rubric: IRubric;
    earnedSlice: IRubricSlice | undefined;
    comment: string;
}

export interface IStudentRecord {
    student: IStudent;
    grades: Array<IRubricGrade>;
    rubricGroup: IRubricGroup;
}

export interface ITeamRecord {
    id: string;
    team: ITeam;
    studentRecords: Array<IStudentRecord>
    timestamp: Date;
    updatedTimestamp?: Date;
}
