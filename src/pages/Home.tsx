import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';


interface guess {
    red: number;
    green: number;
    blue: number
}

function Home() {
    const [guesses, setGuesses] = useState<guess[]>([]);
    const currentColor:guess = {red:255, green:160, blue: 100};

    const [red, setRed] = useState<number>(999);
    const [green, setGreen] = useState<number>(999);
    const [blue, setBlue] = useState<number>(999);

    useEffect(() => {
        setGuesses([{red: 100, green: 40, blue: 255}, {red: 255, green: 210, blue: 100}]);
    }, []);

    const makeGuess = () => {
        
    }

    const getBorderClass = (value:number, color:string) => {
        var diff:number;
        
        switch(color){
            case "red":
                diff = Math.abs(value - currentColor.red);
                break;
            case "green":
                diff = Math.abs(value - currentColor.green);
                break;
            case "blue":
                diff = Math.abs(value - currentColor.blue);
                break;
            default:
                diff = 9999;
        }

        if(diff <= 10){
            return "border-green-500";
        }
        else if(diff <= 50){
            return "border-yellow-500";
        }
        else {
            return "border-neutral-700";
        }
    }

    return <>
        {/* Header */}
        <div className="px-5 py-5 border-b-2 border-neutral-700">
            <div className="float-right w-10 h-10 pt-0.5 text-3xl text-center rounded-full bg-neutral-600 hover:cursor-pointer hover:bg-neutral-300 transition duration-300">
                ?
            </div>
            <h1 className="text-3xl font-bold text-center">COLR_GUESSR</h1>
        </div>

        {/* Playing zone */}
        <div className="pt-10 mx-auto w-96"> {/* update the width depending on the size */}
            {/* colored square */}
            <div className="mx-auto bg-red-500 rounded-lg h-96"></div>

            {/* Guess input */}
            <h4 className="mt-2 text-2xl text-center">Guess the color of the square.</h4>
            <div className="w-full p-2 mt-2 border-2 rounded-lg border-neutral-600">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <input type="number" placeholder="Red"  min={0} max={255} className="w-full px-2 py-1 text-white placeholder-white bg-red-500 rounded-full"/>
                    </div>
                    <div>
                        <input type="number" placeholder="Green"  min={0} max={255} className="w-full px-2 py-1 text-white placeholder-white bg-green-500 rounded-full"/>
                    </div>
                    <div>
                        <input type="number" placeholder="Blue"  min={0} max={255} className="w-full px-2 py-1 text-white placeholder-white bg-blue-500 rounded-full"/>
                    </div>
                    <div>
                        <button className="w-full px-2 py-1 transition duration-300 rounded-full bg-neutral-500 hover:bg-neutral-400">Guess</button>
                    </div>
                </div>
            </div>

            {guesses.length > 0 && <div className="grid grid-cols-4 gap-4 px-2 pt-10 text-center">
                    <p>Red</p>
                    <p>Green</p>
                    <p>Blue</p>
                    <p>Tries</p>
                </div>
            }

            {/* Guesses */}
            {guesses.map((guess, index) => <div className={`w-full p-2 border-2 rounded-lg border-neutral-600 ${index === 0 ? "" : "mt-5"}`}>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <div className={`w-full py-0.5 border-2 rounded-full  ${getBorderClass(guess.red, "red")}`}>
                            <p className="text-center mt-0.5">{guess.red}</p>
                        </div>
                    </div>
                    <div>
                        <div className={`w-full py-0.5 border-2 rounded-full  ${getBorderClass(guess.green, "green")}`}>
                            <p className="text-center mt-0.5">{guess.green}</p>
                        </div>
                    </div>
                    <div>
                        <div className={`w-full py-0.5 border-2 rounded-full  ${getBorderClass(guess.blue, "blue")}`}>
                            <p className="text-center mt-0.5">{guess.blue}</p>
                        </div>
                    </div>
                    <div>
                        <p className="mt-1.5 text-center text-neutral-400">{index+1} / 8</p>
                    </div>
                </div>
            </div>)}
            

        </div>

        </>;
}

export default Home;
