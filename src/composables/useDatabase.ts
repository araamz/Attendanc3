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

    const getAllTeams = async (): Promise<Array<ITeam>> => {
        return db.teams.toArray()
    }

    const getSingleTeam = (teamNumber: number): Promise<ITeam | undefined> => {
        return db.teams.get(teamNumber).then((team) => {
            if (team === undefined) {
                const error = new Error()
                error.name = "UnknownTeam"
                error.message = `Team #${teamNumber} is not found in the database.`
                throw error
            }
            return team
        })
    }

    const updateTeam = async (team: ITeam): Promise<number> => {

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

        return db.teams.put(sanitizedTeamObject)

    }


    const deleteTeam = async (teamNumber: number): Promise<number> => {
        try {
            const countBefore = await db.teams.where("teamNumber").equals(teamNumber).count();

            if (countBefore === 0) {
                return 0; // or handle the case where the team doesn't exist
            }

            // Perform the delete operation
            return db.teams.where("teamNumber").equals(teamNumber).delete();

        } catch (error) {
            throw error; // or handle the error as needed
        }
    };

    return {createNewTeam, getAllTeams, getSingleTeam, updateTeam, deleteTeam}

}