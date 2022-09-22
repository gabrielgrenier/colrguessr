import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useLocalStorage } from 'react-use';
import Modal from 'react-modal';


interface Color {
    red: number;
    green: number;
    blue: number;
}

interface Game {
    date: string;
    state: string;
    //Need to add the guesses here, color, hex, etc => add a game history
}

function Home() {
    const [red, setRed] = useState<number>(9999);
    const [green, setGreen] = useState<number>(9999);
    const [blue, setBlue] = useState<number>(9999);
    const [isTutorialModalOpen, setIsTutorialModalOpen] = React.useState(false);

    const [playedDates, setPlayedDates] = useLocalStorage<string[]>("playedDates", []);
    const [playedGames, setPlayedGames] = useLocalStorage<Game[]>("playedGames", []);
    const [currentColor, setCurrentColor] = useLocalStorage<Color>("currentColor", {red:255, green:160, blue: 100});
    const [currentHex, setCurrentHex] = useLocalStorage<string>("currentHext", "#FFA064");
    const [guesses, setGuesses] = useLocalStorage<Color[]>("guesses", []);

    const { width, height } = useWindowSize();

    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(20, 20, 20, 0.75)'
        }
      };


    useEffect(() => {
        //console.log(playedDates);
        //console.log(currentColor);
        //console.log(playedGames);
        //getCurrentGameState();
        
        //const today = new Date().toLocaleDateString("en-US");
        //setPlayedDates([]);
        //setPlayedGames([]);
        
        var todayD = new Date();
        todayD.setDate(todayD.getDate());

        const today = todayD.toLocaleDateString("en-US");
        
        var datesTemp = playedDates !== undefined ? [...playedDates] : [];
        var gamesTemp = playedGames !== undefined ? [...playedGames] : [];

        //If it's a new day
        if(!datesTemp.includes(today)){
            console.log("ici");
            
            //add today's date to the list
            datesTemp.push(today);
            setPlayedDates(datesTemp);

            //add a new game to the histoy
            gamesTemp.push({date: today, state:"playing"});
            setPlayedGames(gamesTemp);

            //Generate the color for the day
            generateRandomColor();

            //reset the guesses
            setGuesses([]);
        }

        
    }, []);

    const getCurrentGameState = () => {
        return playedGames?.find((game:Game) => game.date === (new Date()).toLocaleDateString("en-US"))?.state; //Could use playedGames[platedGames.length()-1], but safer this way
    }

    const setCurrentGameState = (state:string) => {
        var gamesTemp = playedGames !== undefined ? [...playedGames] : [];
        const index = gamesTemp.findIndex((game:Game) => game.date === (new Date()).toLocaleDateString("en-US"));
        
        gamesTemp[index].state = state;
        setPlayedGames(gamesTemp);
    }



    const makeGuess = () => {
        var arrTemp = guesses !== undefined ? [...guesses] : [];
        
        if(red <= 255 && red >= 0 && green <= 255 && green >= 0 && blue <= 255 && blue >= 0){
            arrTemp.push({red: red, green: green, blue: blue});
            setGuesses(arrTemp);

            if(currentColor){

                if(Math.abs(red - currentColor.red) <= 10 && Math.abs(green - currentColor.green) <= 10 && Math.abs(blue - currentColor.blue) <= 10){
                    setCurrentGameState("won");
                }
                else if(arrTemp.length >= 8){
                    setCurrentGameState("lost");
                }
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
        const rgb:Color = hextToRgb(hex);
        console.log(rgb);
        
        setCurrentColor(rgb);
        setCurrentHex(hex);
    }

    const hextToRgb = (hex:string) => {
        var formatted = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return formatted ? {red: parseInt(formatted[1], 16), green: parseInt(formatted[2], 16), blue: parseInt(formatted[3], 16)} : {red:0, green:0, blue:0};
    }

    const getBorderClass = (value:number, color:string) => {
        var diff:number = 999;
        
        if(currentColor){
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
            }
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

        <Modal
            isOpen={isTutorialModalOpen}
            //onAfterOpen={afterOpenModal}
            //onRequestClose={closeModal}
            style={modalStyle}
            contentLabel="Example Modal"
            className="px-2 py-3 mx-auto mt-10 border-2 rounded-lg outline-none sm:px-10 bg-neutral-900 sm:w-96 w-80 border-neutral-700"
        >
            <div className="mb-3">
                <button className="float-right text-xl font-bold transition duration-300 hover:text-red-400" onClick={() => setIsTutorialModalOpen(false)}>
                    X
                </button>
                <h1 className="text-xl font-semibold text-center">HOW TO PLAY</h1>
            </div>
            <div className="">
                <p>You need to guess the color in <strong> 8 tries.</strong></p>
                <p className="mt-3">Each color value is set between <strong>0</strong> and <strong>255</strong>.</p>
                <p className="mt-3">If your guess is within 10 units, it counts as valid.</p>
                <p className="mt-3">Border definitions: </p>
                <ul className="ml-10 list-disc">
                    <li><span className="font-semibold text-green-500">Green:</span> value within 10 units</li>
                    <li><span className="font-semibold text-yellow-500">Yellow:</span> value within 50 units</li>
                    <li><span className="font-semibold text-neutral-600">Gray:</span> value over 50 units </li>
                </ul>

                <h4 className="mt-3 text-lg font-semibold">Exemple : </h4>
                <div className="mt-3">
                    <div className="grid grid-cols-3 gap-4 px-2 text-center">
                        <p>Red</p>
                        <p>Green</p>
                        <p>Blue</p>
                    </div>
                    <div className={`w-full p-2 border-2 rounded-lg border-neutral-600`}>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className={`w-full py-0.5 border-2 rounded-full border-green-500`}>
                                    <p className="text-center mt-0.5">255</p>
                                </div>
                            </div>
                            <div>
                                <div className={`w-full py-0.5 border-2 rounded-full border-yellow-500`}>
                                    <p className="text-center mt-0.5">100</p>
                                </div>
                            </div>
                            <div>
                                <div className={`w-full py-0.5 border-2 rounded-full border-neutral-700`}>
                                    <p className="text-center mt-0.5">50</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <p>The red value is <span className="font-semibold text-green-500">valid.</span></p>
                        <p>The green value is <span className="font-semibold text-yellow-500">within 50 units.</span></p>
                        <p>The blue value is <span className="font-semibold text-neutral-600">over 50 units.</span></p>
                    </div>
                </div>

                <div className="mt-5 text-center">
                    <button className="px-5 transition duration-300 border-2 rounded-full hover:bg-white hover:text-neutral-900" onClick={() => setIsTutorialModalOpen(false)}>
                        OK!
                    </button>
                </div>


            </div>
 
        </Modal>
        
        {getCurrentGameState() === "won" &&  <Confetti width={width-20} height={height} recycle={false} numberOfPieces={2000}/>}
        
        {/* Header */}
        <div className="px-5 py-5 border-b-2 border-neutral-700">
            <h1 className="text-2xl font-bold text-center sm:text-3xl">COLR_GUESSR</h1>

            {/* buttons div */}
            <div className="float-right -mt-9">
                <button className="w-10 h-10 pt-0.5 -mt-0.5 text-3xl text-center rounded-full bg-neutral-600 hover:cursor-pointer hover:bg-neutral-300 transition duration-300" onClick={() => setIsTutorialModalOpen(true)}>
                    ?
                </button>
            </div>

        </div>

        {/* Playing zone */}
        <div className="py-10 mx-auto sm:w-96 w-80"> {/* update the width depending on the size */}
            {/* colored square */}
            {currentHex !== "" && <div className="mx-auto rounded-lg sm:h-96 h-80" style={{background: currentHex}}></div>}

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
                            onClick={() => makeGuess()} disabled={getCurrentGameState() === "lost" || getCurrentGameState() === "won"}>
                            {getCurrentGameState() === "playing" ? "Guess" : (getCurrentGameState() === "won" ? "🎉" : "😞")}
                        </button>
                    </div>
                </div>
            </div>

            {guesses && guesses.length > 0 && <div className="grid grid-cols-4 gap-4 px-2 pt-10 text-center">
                <p>Red</p>
                <p>Green</p>
                <p>Blue</p>
                <p>Tries</p>
            </div>}

            {/* Guesses */}
            {guesses && [...guesses].reverse().map((guess, index) => <div className={`w-full p-2 border-2 rounded-lg border-neutral-600 ${index === 0 ? "" : "mt-5"}`} key={index}>
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
                        <p className="mt-1.5 text-center text-neutral-400">{guesses.length-index} / 8</p>
                    </div>
                </div>
            </div>)}
            

        </div>

        </>;
}

export default Home;
