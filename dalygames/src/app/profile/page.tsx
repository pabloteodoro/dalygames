import { Container } from "@/components/container"
import Image from "next/image"
import userImg from "/public/user.png"

export default function Profile() {
    return(
        <main className="w-full text-black">
            <Container>
                <section className="mt-8">
                    <div>
                        <Image
                        src={userImg}
                        alt="Imagem Perfil do Usuario"
                        className="rounded-full w-56 h-56 object-cover"
                        />

                    </div> 
                </section>
            </Container>
        </main>
    )
}