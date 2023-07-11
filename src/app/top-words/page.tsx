import WordDisplay from "@/components/WordDisplay";
import Word from "@/solver/word";

// TODO implement infinite scroll
const Page = async () => {
    const res = await fetch(
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000/dictionary.txt"
            : "https://spellcast-magician.vercel.app/dictionary.txt"
    );
    const txt = await res.text();
    const words = txt.split("\n");
    const wordsSorted = Array.from(
        new Array(words.length),
        (_, i) => {
            const word = words[i]!;
            const wordObj = new Word(word);
            return { points: wordObj.calculateSolePoints(), word };
        }
    ).sort((a, b) => b.points - a.points);

    return (
        <div className=''>
            <h1 className='text-xl font-semibold py-5 mx-10'>
                Here is the dictionary in order of points:
            </h1>

            <WordDisplay words={wordsSorted} />
        </div>
    );
};

export default Page;
