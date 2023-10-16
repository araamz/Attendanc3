import {useReducer} from "react";
import {Data, Section, Student, Team, TeamRecord} from "./types.tsx";


const initalState: Data = {
    sections: [],
    teams: [],
    students: [],
    records: []
}

export default function Attendanc3Context() {

    const [data, dispatch] = useReducer(dataReducer, initalState);



}

type Action = {type: 'addSection', section: Section}
    | {type: 'deleteSection', removedSection: Section}
    | {type: 'addTeam', team: Team}
    | {type: 'deleteTeam', removedTeam: Team}
    | {type: 'addStudent', student: Student}
    | {type: 'deleteStudent', removedStudent: Student}
    | {type: 'addTeamRecord', record: TeamRecord}
    | {type: 'deleteTeamRecord', removedRecord: TeamRecord}

function dataReducer(data: Data, action: Action) {

    switch (action.type) {
        case 'addSection': {
            return [data.sections, action.section]
        }
        case "deleteSection": {
            return data.sections.filter((section: Section): boolean => section.sectionNumber !== action.removedSection.sectionNumber)
        }

        case "addTeam": {
            return [data.teams, action.team]
        }
        case "deleteTeam": {
            return data.teams.filter((team: Team): boolean => team.teamNumber !== action.removedTeam.teamNumber);
        }

        case "addStudent": {
            return [data.students, action.student];
        }
        case "deleteStudent": {
            return data.students.filter((student: Student): boolean => student.id !== action.removedStudent.id);
        }

        case "addTeamRecord": {
            return [data.records, action.record]
        }
        case "deleteTeamRecord": {
            return data.records.filter((record: TeamRecord): boolean => record.id !== action.removedRecord.id);
        }
    }
}

// AddSection
// DeleteSection
// AddTeam
// DeleteTeam
// AddStudent
// DeleteStudent
// AddTeamRecord
// DeleteTeamRecord

