
function Guess(props:GuessProps) {


    const getBorderClass = (value:number, color:string) => {
        var diff:number = 999;
        
        if(props.currentColor){
            switch(color){
                case "red":
                    diff = Math.abs(value - props.currentColor.red);
                    break;
                case "green":
                    diff = Math.abs(value - props.currentColor.green);
                    break;
                case "blue":
                    diff = Math.abs(value - props.currentColor.blue);
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
            <div className={`w-full p-2 border-2 rounded-lg border-neutral-600 mb-5`}>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <div className={`w-full py-0.5 border-2 rounded-full  ${getBorderClass(props.guess.red, "red")}`}>
                            <p className="text-center mt-0.5">{props.guess.red}</p>
                        </div>
                    </div>
                    <div>
                        <div className={`w-full py-0.5 border-2 rounded-full  ${getBorderClass(props.guess.green, "green")}`}>
                            <p className="text-center mt-0.5">{props.guess.green}</p>
                        </div>
                    </div>
                    <div>
                        <div className={`w-full py-0.5 border-2 rounded-full  ${getBorderClass(props.guess.blue, "blue")}`}>
                            <p className="text-center mt-0.5">{props.guess.blue}</p>
                        </div>
                    </div>
                    <div>
                        <p className="mt-1.5 text-center text-neutral-400">{props.attempt} / 8</p>
                    </div>
                </div>
            </div>

        </>;
}

export default Guess;
