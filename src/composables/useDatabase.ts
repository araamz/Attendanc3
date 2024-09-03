import {db} from "./db.ts";
import {ITeamRecord, IStudent, IStudentRecord, ITeam} from "../types.ts";

export function useDatabase() {

    const createTeam = async (team: ITeam) => {

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
                return 0;
            }

            // Perform the delete operation
            return db.teams.where("teamNumber").equals(teamNumber).delete();

        } catch (error) {
            throw error;
        }
    };

    const createRecord = async (record: ITeamRecord): Promise<IStudentRecord> => {
        const sanitizedTeam: ITeam = {
            teamNumber: record.team.teamNumber,
            nickname: record.team.nickname,
            table: record.team.table,
            section: record.team.section,
            mentor: record.team.mentor,
            assignedStudents: record.team.assignedStudents.map((student: IStudent) => ({
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                preferredName: student.preferredName,
                preferredPronouns: student.preferredPronouns,
                notes: student.notes
            }))
        };

        const sanitizeRubricGrade = (rubricGrade: IRubricGrade): IRubricGrade => ({
            rubric: {
                id: rubricGrade.rubric.id,
                label: rubricGrade.rubric.label,
                commonDeductions: rubricGrade.rubric.commonDeductions,
                slices: rubricGrade.rubric.slices.map((slice: IRubricSlice) => ({
                    id: slice.id,
                    score: slice.score,
                    label: slice.label,
                    description: slice.description
                }))
            },
            earnedSlice: rubricGrade.earnedSlice ? {
                id: rubricGrade.earnedSlice.id,
                score: rubricGrade.earnedSlice.score,
                label: rubricGrade.earnedSlice.label,
                description: rubricGrade.earnedSlice.description
            } : undefined,
            comment: rubricGrade.comment
        });

        const sanitizedStudentRecords: Array<IStudentRecord> = record.studentRecords.map((studentRecord: IStudentRecord) => ({
            student: {
                id: studentRecord.student.id,
                firstName: studentRecord.student.firstName,
                lastName: studentRecord.student.lastName,
                preferredName: studentRecord.student.preferredName,
                preferredPronouns: studentRecord.student.preferredPronouns,
                notes: studentRecord.student.notes
            },
            grades: studentRecord.grades.map(sanitizeRubricGrade),
            rubricGroup: {
                id: studentRecord.rubricGroup.id,
                label: studentRecord.rubricGroup.label,
                rubrics: studentRecord.rubricGroup.rubrics.map((rubric: IRubric) => ({
                    id: rubric.id,
                    label: rubric.label,
                    commonDeductions: rubric.commonDeductions,
                    slices: rubric.slices.map((slice: IRubricSlice) => ({
                        id: slice.id,
                        score: slice.score,
                        label: slice.label,
                        description: slice.description
                    }))
                }))
            }
        }));

        const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(record.timestamp);

        const sanitizedRecord: ITeamRecord = {
            id: record.id,
            team: sanitizedTeam,
            studentRecords: sanitizedStudentRecords,
            timestamp: formattedTimestamp
        };

        console.log(sanitizedRecord)

        return db.records.add(sanitizedRecord)
    }

    return {createTeam, getAllTeams, getSingleTeam, updateTeam, deleteTeam, createRecord}

}