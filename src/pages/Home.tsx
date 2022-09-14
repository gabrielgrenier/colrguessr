import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'


interface color {
    red: number;
    green: number;
    blue: number;
}

function Home() {
    const [guesses, setGuesses] = useState<color[]>([]);
    const [currentColor, setCurrentColor] = useState<color>({red:255, green:160, blue: 100});
    const [currentHex, setCurrentHex] = useState<string>("");
    const [gameState, setGameState] = useState<string>("playing");

    const [red, setRed] = useState<number>(9999);
    const [green, setGreen] = useState<number>(9999);
    const [blue, setBlue] = useState<number>(9999);

    const { width, height } = useWindowSize()


    useEffect(() => {
        generateRandomColor();
    }, []);

    const makeGuess = () => {
        var arrTemp = [...guesses];
        
        if(red <= 255 && red >= 0 && green <= 255 && green >= 0 && blue <= 255 && blue >= 0){
            arrTemp.push({red: red, green: green, blue: blue});
            setGuesses(arrTemp);

            if(Math.abs(red - currentColor.red) <= 10 && Math.abs(green - currentColor.green) <= 10 && Math.abs(blue - currentColor.blue) <= 10){
                setGameState("won");
            }
            else if(arrTemp.length >= 8){
                setGameState("lost");
            }
        }
        else {
            toast.error("Color values must be between 0 and 255.", {
                theme: 'dark'
            });
        }
    }

    const generateRandomColor = () => {
        const hex = "#" + Math.floor(Math.random()*16777215).toString(16);
        const rgb:color = hextToRgb(hex);
        console.log(rgb);
        setCurrentColor(rgb);
        setCurrentHex(hex);
    }

    const hextToRgb = (hex:string) => {
        var formatted = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return formatted ? {red: parseInt(formatted[1], 16), green: parseInt(formatted[2], 16), blue: parseInt(formatted[3], 16)} : {red:0, green:0, blue:0};
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
                diff = 999;
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
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        
        {gameState.toLowerCase() === "won" &&  <Confetti width={width} height={height} recycle={false} numberOfPieces={2000}/>}
        
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
            {currentHex !== "" && <div className="mx-auto rounded-lg h-96" style={{background: currentHex}}></div>}

            {/* Guess input */}
            <h4 className="mt-2 text-2xl text-center">Guess the color of the square.</h4>
            <div className="w-full p-2 mt-2 border-2 rounded-lg border-neutral-600">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <input type="number" placeholder="Red" className="w-full px-2 py-1 text-white placeholder-white bg-red-500 rounded-full" onChange={(e) => setRed(Number(e.target.value))} />
                    </div>
                    <div>
                        <input type="number" placeholder="Green" className="w-full px-2 py-1 text-white placeholder-white bg-green-500 rounded-full" onChange={(e) => setGreen(Number(e.target.value))} />
                    </div>
                    <div>
                        <input type="number" placeholder="Blue" className="w-full px-2 py-1 text-white placeholder-white bg-blue-500 rounded-full" onChange={(e) => setBlue(Number(e.target.value))} />
                    </div>
                    <div>
                        <button className="w-full px-2 py-1 transition duration-300 rounded-full bg-neutral-500 hover:bg-neutral-400 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed" 
                            onClick={() => makeGuess()} disabled={gameState.toLocaleLowerCase() === "lost" || gameState.toLocaleLowerCase() === "won"}>
                            {gameState.toLocaleLowerCase() === "playing" ? "Guess" : (gameState.toLocaleLowerCase() === "won" ? "🎉" : "😞")}
                        </button>
                    </div>
                </div>
            </div>

            {guesses.length > 0 && <div className="grid grid-cols-4 gap-4 px-2 pt-10 text-center">
                <p>Red</p>
                <p>Green</p>
                <p>Blue</p>
                <p>Tries</p>
            </div>}

            {/* Guesses */}
            {guesses.map((guess, index) => <div className={`w-full p-2 border-2 rounded-lg border-neutral-600 ${index === 0 ? "" : "mt-5"}`} key={index}>
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
