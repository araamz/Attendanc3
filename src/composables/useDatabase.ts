import {db} from "./db.ts";
import {IStudent, ITeam} from "../types.ts";

export function useDatabase() {

    const createNewTeam = async (team: ITeam) => {

        const sanitizedAssignedStudentsArray: Array<IStudent> = team.assignedStudents.map((student: IStudent) => {
            return {
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                preferredName: student.preferredName,
                preferredPronouns: student.preferredPronouns,
                notes: student.notes
            }
        })

        const sanitizedTeamObject: ITeam = {
            teamNumber: team.teamNumber,
            nickname: team.nickname,
            table: team.table,
            section: team.section,
            mentor: team.mentor,
            assignedStudents: sanitizedAssignedStudentsArray
        }

        return db.teams.add(sanitizedTeamObject)
    }

    const editTeam = async (team: ITeam): Promise<number> => {
        try {
            return await db.teams.put(team)
        } catch (error) {
            throw error;
        }
    }

    return {createNewTeam, editTeam}

}