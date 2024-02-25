import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const apiBaseUrl = import.meta.env.VITE_APP_API;

const getAll = async (): Promise<DiaryEntry[]> => {
    const { data } = await axios.get<DiaryEntry[]>(
        `${apiBaseUrl}/diaries`
    );

    return data;
};

const addDiary = async (formData: NewDiaryEntry): Promise<NewDiaryEntry> => {
    const { data } = await axios.post<NewDiaryEntry>(
        `${apiBaseUrl}/diaries`,
        formData
    )
    console.log('addDiary', data);
    return data;
}

export default {
    getAll,
    addDiary
};
