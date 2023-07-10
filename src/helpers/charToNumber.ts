export default function charToNumber(char: string) {
    // Convert character to uppercase
    char = char.toUpperCase();

    // Get ASCII value of character
    var asciiValue = char.charCodeAt(0);

    // Calculate the number by subtracting the ASCII value of 'A'
    var number = asciiValue - 65;

    return number;
}
