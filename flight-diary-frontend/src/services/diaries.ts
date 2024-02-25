import axios from "axios";
import { DiaryEntry } from "../types";

const apiBaseUrl = import.meta.env.VITE_APP_API;

const getAll = async (): Promise<DiaryEntry[]> => {
    const { data } = await axios.get<DiaryEntry[]>(
        `${apiBaseUrl}/diaries`
    );

    return data;
};

export default {
    getAll
};
