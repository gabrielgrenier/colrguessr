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

interface GuessProps {
    attempt: number;
    showAttempt: boolean;
    guess: Color;
    currentColor?: Color;
}
