interface IStudent {
    id: string;
    firstName: string;
    lastName: string;
    pronouns: string;
}
interface ITeam {
    teamNumber: number;
    teamNickname: string;
    table: string;
    section: string;
    mentor: string;
}

interface IRubricSlice {
    id: string;
    score: number;
    description: string;
}
interface IRubric {
    id: string;
    label: string;
    slices: Array<IRubricSlice>
}

interface IRubricGrade {
    rubric: IRubric;
    earnedSlice: IRubricSlice;
}

interface IStudentRecord {
    student: IStudent;
    rubricGrade: Array<IRubricGrade>;
}

interface IRecord {
    team: ITeam;
    studentRecords: Array<IStudentRecord>
    timestamp: Date;
}