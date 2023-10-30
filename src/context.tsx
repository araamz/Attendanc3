import {Team, TeamRecord, Student} from "./types.tsx";
import {useReducer} from "react";

type State = {
    pronouns: Array<string>;
    sections: Array<number>;
    teams: Array<Team>;
    students: Array<Student>;
    records: Array<TeamRecord>;
}

type Action =
    | { type: 'AddSection',  added_section: number }
    | { type: 'DeleteSection', deleted_section: number }
    | { type: 'AddTeam', added_team: Team }
    | { type: 'DeleteTeam', deleted_team: Team }
    | { type: 'AddStudent', added_student: Student }
    | { type: 'DeleteStudent', deleted_student: Student }
    | { type: 'AddTeamRecord', added_record: TeamRecord }
    | { type: 'DeleteTeamRecord', deleted_record: TeamRecord }

const initial_state: State = {
    pronouns: [
        'she-her',
        'he-him',
        'she-they',
        'he-they',
        'pns'
    ],
    sections: [],
    teams: [],
    students: [],
    records: []
}

function AppReducer(state: State, action: Action): State {

    switch (action.type) {
        case "AddSection": {

            const new_sections: Array<number> = state.sections;
            new_sections.push(action.added_section);

            return {
                ...state,
                sections: new_sections
            }
        }

        case "DeleteSection": {

            const new_sections: Array<number> = state.sections;
            new_sections.map((section: number) => {
                if (section != action.deleted_section) {
                    return section;
                }
            })

            return {
                ...state,
                sections: new_sections
            }
        }

        case "AddTeam": {

            const new_teams: Array<Team> = state.teams;
            new_teams.push(action.added_team);

            return {
                ...state,
                teams: new_teams
            }
        }

        case "DeleteTeam": {

            const new_teams: Array<Team> = state.teams;
            new_teams.map((team: Team) => {
                if (team != action.deleted_team) {
                    return team;
                }
            })

            return {
                ...state,
                teams: new_teams
            }
        }

        case "AddStudent": {

            const new_students: Array<Student> = state.students;
            new_students.push(action.added_student)

            return {
                ...state,
                students: new_students
            }
        }

        case "DeleteStudent": {

            const new_students: Array<Student> = state.students
            new_students.map((student: Student) => {
                if (student != action.deleted_student) {
                    return student;
                }
            })

            return {
                ...state,
                students: new_students
            }
        }

        case "AddTeamRecord": {

            const new_records: Array<TeamRecord> = state.records
            new_records.push(action.added_record)

            return {
                ...state,
                records: new_records
            }
        }

        case "DeleteTeamRecord": {

            const new_records: Array<TeamRecord> = state.records;
            new_records.map((record: TeamRecord) => {
                if (record != action.deleted_record) {
                    return record
                }
            })

            return {
                ...state,
                records: new_records
            }
        }
    }

}

export default function AppContext() {

    const [state, dispatch] = useReducer(AppReducer, initial_state);

    function AddSection(section: number) {
        dispatch({
            type: 'AddSection',
            added_section: section
        })
    }
    function DeleteSection(section: number) {
        dispatch({
            type: 'DeleteSection',
            deleted_section: section
        })
    }

    function AddTeam(team: Team) {
        dispatch({
            type: 'AddTeam',
            added_team: team
        })
    }

    function DeleteTeam(team: Team) {
        dispatch({
            type: 'DeleteTeam',
            deleted_team: team
        })
    }

    function AddStudent(student: Student) {
        dispatch({
            type: 'AddStudent',
            added_student: student
        })
    }

    function DeleteStudent(student: Student) {
        dispatch({
            type: 'DeleteStudent',
            deleted_student: student
        })
    }

    function AddTeamRecord(team_record: TeamRecord) {
        dispatch({
            type: 'AddTeamRecord',
            added_record: team_record
        })
    }

    function DeleteTeamRecord(team_record: TeamRecord) {
        dispatch({
            type: 'DeleteTeamRecord',
            deleted_record: team_record
        })
    }


    return {
        state,
        AddSection,
        DeleteSection,
        AddTeam,
        DeleteTeam,
        AddStudent,
        DeleteStudent,
        AddTeamRecord,
        DeleteTeamRecord
    }

}