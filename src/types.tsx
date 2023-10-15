export type Section = {
    sectionNumber: number;
}

export type Team = {
    teamNumber: number;
    tableNumber: number;
}

export type Pronoun = {
    pronoun: string;
}

export type AttendanceRecord = {
    date: string;
    present: boolean;
    studyGuide: boolean;
    incompleteNotes: boolean;
}

export type Student = {
    id: number;
    firstName: string;
    lastName: string;
    nickName: string;
    preferredPronoun: Pronoun;
    record: Array<AttendanceRecord>
    assingedTeam: Team;
}

