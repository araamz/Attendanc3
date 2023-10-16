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

export type Student = {
    id: string;
    firstName: string;
    lastName: string;
    nickName: string;
    preferredPronoun: Pronoun;
    assignedTeam: Team;
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
    teamNumber: Team;
    records: Array<Record>;
}

export type Data = {
    sections: Array<Section>;
    teams: Array<Team>;
    students: Array<Student>;
    records: Array<TeamRecord>;
}



