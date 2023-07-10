import { Letter } from "@/solver/tile";

export default function isLetter(str: string): str is Letter {
    return !!(str.length === 1 && str.match(/[a-z]/i));
}
