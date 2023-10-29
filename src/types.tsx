export type Team = {
    team_number: number;
    table_number: number;
}

export type Student = {
    id: string;
    firstName: string;
    lastName: string;
    nickName: string;
    preferred_pronoun: string;
    assigned_team: Team;
}

export type Status = {
    points: number;
    description: string;
}

export type Record = {
    date: string;
    student: Student;
    billable_hours: Status;
    lab_preparation: Status;

}

export type TeamRecord = {
    id: string;
    team_number: Team;
    records: Array<Record>;
}



