import { FormEvent, useState } from 'react';
import DiaryService from './../services/diaries';
import { NewDiaryEntry, Weather, Visibility } from '../types';

const AddDiary = () => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const [msg, setMsg] = useState('');

    const handleAddDiary = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newDiary = { date, visibility: visibility as Visibility, weather: weather as Weather, comment };
        DiaryService.addDiary(newDiary).then((data: NewDiaryEntry) => {
            console.log(data);
            handleOnSuccess();
        }).catch((error) => {
            // console.error('error', error);
            setMsg(error?.message);
        })
    }

    const handleSetMsg = (msg: string) => {
        setMsg(msg);
        setTimeout(() => {
            setMsg('')
        }, 3000)
    }

    const handleOnSuccess = () => {
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
        handleSetMsg('Diary added!');
    }

    return (
        <>
            <h2 className="text-2xl border-b-2 mb-4 pb-2">Add New Diary</h2>
            {msg && 
                <div className="block bg-white text-black p-2 mb-4">{msg}</div>
            }
            <form onSubmit={handleAddDiary}>
                <label htmlFor="date" className="block pb-4 flex">
                    <span className="pr-4 inline-block min-w-inline-input">Date:</span>
                    <input type="date" id="date" name="date" className="flex-grow" value={date} onChange={(e) => setDate(e.target.value)}></input>
                </label>
                <label htmlFor="visibility" className="block pb-4 flex">
                    <span className="pr-4 inline-block min-w-inline-input">Visibility:</span>
                    <input type="text" id="visibility" name="visibility" className="flex-grow" value={visibility} onChange={(e) => setVisibility(e.target.value)}></input>
                </label>
                <label htmlFor="weather" className="block pb-4 flex">
                    <span className="pr-4 inline-block min-w-inline-input">Weather:</span>
                    <input type="text" id="weather" name="weather" className="flex-grow" value={weather} onChange={(e) => setWeather(e.target.value)}></input>
                </label>
                <label htmlFor="comment" className="block pb-4 flex">
                    <span className="pr-4 inline-block min-w-inline-input">Comment:</span>
                    <textarea id="comment" name="comment" className="flex-grow" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                </label>
                <button type="submit" className="block bg-white text-black mt-4 w-full">Add</button>
            </form>
        </>
    )
};

export default AddDiary;