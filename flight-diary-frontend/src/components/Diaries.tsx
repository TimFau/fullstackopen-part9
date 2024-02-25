import { useEffect, useState } from "react"
import DiariesService from "./../services/diaries"
import { DiaryEntry } from "../types";

const Diaries = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])

    useEffect(() => {
        DiariesService.getAll().then(data => {
            // console.log(data)
            setDiaries(data)
        })
    }, [])

    const DiaryCard = ({ diary }: { diary: DiaryEntry } ) => (
        <p className="diary-card my-4 pb-4 border-b last:border-b-0">
            <strong className="block pb-2">{diary.date}</strong>
            <span className="block pb-2 capitalize">Weather: <span>{diary.weather}</span></span>
            <span className="block pb-2 capitalize">Visibility: <span>{diary.visibility}</span></span>
        </p>
    )
    return (
        <div className="diaries-container">
            {diaries.map((diary: DiaryEntry, index) => <DiaryCard diary={diary} key={index} />)}
        </div>
    )
}

export default Diaries;