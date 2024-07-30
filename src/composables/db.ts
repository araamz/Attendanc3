import Dexie, { type EntityTable } from 'dexie';
import {IRecord, ITeam} from "../types.ts";

const db = new Dexie('database') as Dexie & {
    teams: EntityTable<ITeam, 'teamNumber'>
    records: EntityTable<IRecord, 'id'>
}

db.version(1).stores({
    teams: 'teamNumber, nickname, table, mentor, assignedStudents',
    records: 'id, team, studentRecords, timestamp'
})

export {db}