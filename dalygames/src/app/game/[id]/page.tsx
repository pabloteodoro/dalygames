import { GameProps } from "@/utils/types/game";
import Image from 'next/image'
import { Container} from '@/components/container'
import { Label } from './components/label'
import { GameCard } from '@/components/GameCard'


async function getData(id: string){

    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id={id}`)
        return res.json();
    }catch(err) {
        throw new Error("Failed to fetch data")
    }
} 

async function getGameSorted(){
    try{
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`)
        return res.json();
    }catch(err){
        throw new Error("Failed to fetch data")
    }
}



export default async function Game({
  params: { id }
}: {
  params: { id: string }
}) {
  const data = await getGameData(id);
  const sortedGame: GameProps = await getGameSorted();

  if (!data) {
    return (
      <main className="w-full text-black">
        <Container>
          <h1 className="font-bold text-x1 my-4">Jogo não encontrado</h1>
          <p>Não foi possível carregar os dados do jogo. Tente novamente mais tarde.</p>
        </Container>
      </main>
    );
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        {data.image_url && (
          <Image
            className="object-cover w-full h-80 sm:h-96 opacity-80"
            src={data.image_url}
            alt={data.title}
            priority={true}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          />
        )}
      </div>

      <Container>
        <h1 className="font-bold text-x1 my-4">{data.title}</h1>
        <p>{data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
            {data.platforms.map((item: string) => (
                <Label name={item} key={item}/>
            ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                <div className="flex gap-2 flex-wrap">
                    {data.categories.map((item: string) => (
                        <Label name={item} key={item}/>
                    ))}
                </div>

                <p className="mt-7 mb-2"><strong>Data de Lançamento:</strong>{data.release}</p>

            <h2 className="font-bold text-lg mt-7 mb-2">Jogo Recomendado:</h2>
                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={sortedGame}/>
                    </div>
                </div>

        {/* Renderizar outras informações do jogo */}
      </Container>
    </main>
  );
}



async function getGameData(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Disable cache temporarily for debugging
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Failed to fetch game data:', error);
    return null;
  }
}