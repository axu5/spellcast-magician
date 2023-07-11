import SpellcastInput from "@/components/SpellcastInput";
import { Balancer } from "react-wrap-balancer";

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center p-24'>
            <div className='flex flex-row w-[50%] justify-around'>
                <h1 className='text-3xl text-center mb-1'>
                    Spellcast Magician
                </h1>
            </div>
            <h2 className='text-zinc-800 text-center mt-1 mb-2 w-screen sm:w-md'>
                <Balancer>
                    Enter your board here (Right click to add
                    attributes and CAPS for gems)
                </Balancer>
            </h2>
            <SpellcastInput />
        </main>
    );
}
