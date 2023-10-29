import {useReducer} from "react";
import {Data, Section, Student, Team, TeamRecord} from "./types.tsx";


const initalState: Data = {
    sections: [],
    teams: [],
    students: [],
    records: []
}

function dataReducer(state: Data, action: Action) {

    switch (action.type) {
        case 'addSection': {
            return [state.sections, action.payload]
        }
        case "deleteSection": {
            return state.sections.filter((section: Section): boolean => section.sectionNumber !== action.payload.sectionNumber)
        }

        case "addTeam": {
            return [state.teams, action.payload]
        }
        case "deleteTeam": {
            return state.teams.filter((team: Team): boolean => team.teamNumber !== action.payload.teamNumber);
        }

        case "addStudent": {
            return [state.students, action.payload];
        }
        case "deleteStudent": {
            return state.students.filter((student: Student): boolean => student.id !== action.payload.id);
        }

        case "addTeamRecord": {
            return [state.records, action.payload]
        }
        case "deleteTeamRecord": {
            return state.records.filter((record: TeamRecord): boolean => record.id !== action.payload.id);
        }
    }
}


type Action = {type: 'addSection', payload: Section}
    | {type: 'deleteSection', payload: Section}
    | {type: 'addTeam', payload: Team}
    | {type: 'deleteTeam', payload: Team}
    | {type: 'addStudent', payload: Student}
    | {type: 'deleteStudent', payload: Student}
    | {type: 'addTeamRecord', payload: TeamRecord}
    | {type: 'deleteTeamRecord', payload: TeamRecord}

export default function Attendanc3Context() {

    const [state, dispatch] = useReducer(dataReducer, initalState);
    return [state, dispatch];

}


// AddSection
// DeleteSection
// AddTeam
// DeleteTeam
// AddStudent
// DeleteStudent
// AddTeamRecord
// DeleteTeamRecord

