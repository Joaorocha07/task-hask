'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Titulo from "./components/Titulo";
import { Box } from "@mui/material";
// import imageFundo from './../../../public/images/img7.png';
import Tarefas from "./components/Tarefas";
import { isAuthenticated } from "@/lib/auth";

const selectedImage = localStorage.getItem("imagemSelecionada")

export default function Dashboard() {
    const [userData, setUserData] = useState<{ nome: string; email: string } | null>(null);
    const router = useRouter()
    console.log(selectedImage)

    useEffect(() => {
        const storedUserData = localStorage.getItem('usuarioLogado');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        } else {
            router.replace('/login');
        }
    }, [router]);

    if (!isAuthenticated()) {
        return null; 
    }
    return (
        <>
            <Box
                position="absolute"
                width="100vw"
                height="100vh"
                sx={{
                    backgroundImage: `url(${selectedImage.src})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            >
                <Header />
                <Titulo />
                <Tarefas />
            </Box>
            <h1>Você está logado!</h1>
        </>
    )
}