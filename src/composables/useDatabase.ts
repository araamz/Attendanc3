import {db} from "./db.ts";
import {ITeam} from "../types.ts";

export function useDatabase() {

    const createNewTeam = async (team: ITeam): Promise<number> => {
        try {
            return await db.teams.add(team)
        } catch (error) {
            throw error;
        }
    }

}