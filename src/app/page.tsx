import SpellcastInput from "@/components/SpellcastInput";

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center p-24'>
            <h1 className='text-3xl'>Spellcast Magician</h1>
            <h2 className='text-xl:'>
                Enter your board here (Right click to add attributes)
            </h2>
            <SpellcastInput />
        </main>
    );
}
