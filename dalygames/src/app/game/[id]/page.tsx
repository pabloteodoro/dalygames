import { GameProps } from "@/utils/types/game";
import Image from 'next/image'
import { Container} from '@/components/container'


async function getData(id: String){

    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id={id}`)
        return res.json();
    }catch(err) {
        throw new Error("Failed to fetch data")
    }
} 





export default async function Game({
    params: {id}
}: {
    params: {id: string}
}) {
    const data: GameProps = await getData(id)

    if (!data) {
       
    }

    return (
        <main className="w-full text-black">
            <div className="bg-black h-80 sm:h-96 w-full relative">
                <Image
                className="object-cover w-full h-80 sm:h-96 opacity-80"
                src={data.image_url}
                alt={data.title}
                priority={true}
                fill={true}
                sizes="(max-width: 768px 100vw, (max-width: 1200px) 44vw"                
                />

            </div>

            <Container>
                <h1 className="font-bold text-x1 my-4">{data.title}</h1>
                <p>{data.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                <div>
                    
                </div>
            </Container>
                


        </main>
    )
}