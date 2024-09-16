import {db} from "./db.ts";
import {
    ITeamRecord,
    IStudent,
    IStudentRecord,
    ITeam,
    IRubricGrade,
    IRubricSlice,
    IRubric,
    IRubricGroup
} from "../types.ts";
import RubricSlice from "../components/RubricSlice.vue";

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
        
        const sanitizedStudentRecords: Array<IStudentRecord> = record.studentRecords.map((studentRecord: IStudentRecord): IStudentRecord => ({
            student: {
                id: studentRecord.student.id,
                firstName: studentRecord.student.firstName,
                lastName: studentRecord.student.lastName,
                preferredName: studentRecord.student.preferredName,
                preferredPronouns: studentRecord.student.preferredPronouns,
                notes: studentRecord.student.notes
            },
            grades: studentRecord.grades.map((rubricGrade: IRubricGrade) => ({
                rubric: {
                    id: rubricGrade.rubric.id,
                    label: rubricGrade.rubric.label,
                    commonDeductions: rubricGrade.rubric.commonDeductions.map((deduction: string) => deduction),
                    slices: rubricGrade.rubric.slices.map((rubricSlice: IRubricSlice) => ({
                        id: rubricSlice.id,
                        score: rubricSlice.score,
                        label: rubricSlice.label,
                        description: rubricSlice.description
                    }))
                },
                earnedSlice: rubricGrade.earnedSlice ? {
                    id: rubricGrade.earnedSlice.id,
                    score: rubricGrade.earnedSlice.score,
                    label: rubricGrade.earnedSlice.label,
                    description: rubricGrade.earnedSlice.description
                } : undefined,
                comment: rubricGrade.comment
            })),
            rubricGroup: {
                id: studentRecord.rubricGroup.id,
                label: studentRecord.rubricGroup.label,
                rubrics: studentRecord.rubricGroup.rubrics.map((rubric: IRubric) => ({
                    id: rubric.id,
                    label: rubric.label,
                    commonDeductions: rubric.commonDeductions.map((deduction: string) => deduction),
                    slices: rubric.slices.map((rubricSlice: IRubricSlice) => ({
                        id: rubricSlice.id,
                        score: rubricSlice.score,
                        label: rubricSlice.label,
                        description: rubricSlice.description
                    }))
                }))
            }
        }))

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

        return db.records.add(sanitizedRecord)
    }

    const getAllRecords = async () => {
        return db.records.toArray();
    }

    const getSingleRecord = async (recordId: string) => {
        return db.records.get(recordId).then((record) => {
            if (record === undefined) {
                const error = new Error()
                error.name = "UnknownRecord"
                error.message = `Record ${recordId} is not found in the database.`
                throw error
            }
            return record
        })
    }

    const updateRecord = async (record: ITeamRecord): Promise<IStudentRecord> => {
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

        const sanitizedStudentRecords: Array<IStudentRecord> = record.studentRecords.map((studentRecord: IStudentRecord): IStudentRecord => ({
            student: {
                id: studentRecord.student.id,
                firstName: studentRecord.student.firstName,
                lastName: studentRecord.student.lastName,
                preferredName: studentRecord.student.preferredName,
                preferredPronouns: studentRecord.student.preferredPronouns,
                notes: studentRecord.student.notes
            },
            grades: studentRecord.grades.map((rubricGrade: IRubricGrade) => ({
                rubric: {
                    id: rubricGrade.rubric.id,
                    label: rubricGrade.rubric.label,
                    commonDeductions: rubricGrade.rubric.commonDeductions.map((deduction: string) => deduction),
                    slices: rubricGrade.rubric.slices.map((rubricSlice: IRubricSlice) => ({
                        id: rubricSlice.id,
                        score: rubricSlice.score,
                        label: rubricSlice.label,
                        description: rubricSlice.description
                    }))
                },
                earnedSlice: rubricGrade.earnedSlice ? {
                    id: rubricGrade.earnedSlice.id,
                    score: rubricGrade.earnedSlice.score,
                    label: rubricGrade.earnedSlice.label,
                    description: rubricGrade.earnedSlice.description
                } : undefined,
                comment: rubricGrade.comment
            })),
            rubricGroup: {
                id: studentRecord.rubricGroup.id,
                label: studentRecord.rubricGroup.label,
                rubrics: studentRecord.rubricGroup.rubrics.map((rubric: IRubric) => ({
                    id: rubric.id,
                    label: rubric.label,
                    commonDeductions: rubric.commonDeductions.map((deduction: string) => deduction),
                    slices: rubric.slices.map((rubricSlice: IRubricSlice) => ({
                        id: rubricSlice.id,
                        score: rubricSlice.score,
                        label: rubricSlice.label,
                        description: rubricSlice.description
                    }))
                }))
            }
        }))

        const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(record.timestamp);

        const formattedUpdatedTimestamp = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(record.updatedTimestamp);

        const sanitizedRecord: ITeamRecord = {
            id: record.id,
            team: sanitizedTeam,
            studentRecords: sanitizedStudentRecords,
            timestamp: formattedTimestamp,
            updatedTimestamp: formattedUpdatedTimestamp
        };

        return db.records.put(sanitizedRecord)
    }

    return {createTeam, getAllTeams, getSingleTeam, updateTeam, deleteTeam, createRecord, getAllRecords, getSingleRecord, updateRecord}

}