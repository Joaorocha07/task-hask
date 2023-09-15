'use client'
import { Avatar, Box, Typography } from "@mui/material";
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import { deepOrange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import MenuHeader from "./MenuHeader";

export default function Header() {
    const [userData, setUserData] = useState<{ nome: string; email: string } | null>(null);
    const [horaAtual, setHoraAtual] = useState(new Date());
    

    useEffect(() => {
        const storedUserData = localStorage.getItem('usuarioLogado');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        }

        const intervaloId = setInterval(() => {
            setHoraAtual(new Date());
          }, 1000);
      
          return () => {
            clearInterval(intervaloId);
          };
    }, []);

    const horaFormatada = horaAtual.toLocaleTimeString("en-US", {
        timeZone: "America/Sao_Paulo",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    });

   
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "10vh",
                    background: "#FFF",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    padding: "0 20px",
                }}
                >
                <MenuHeader />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center',
                        background: "rgba(152, 152, 152, 0.11)",
                        width: "16%",
                        height: "7vh",
                        padding: "10px 15px",
                        borderRadius: "15px",
                        mr: '5rem',
                        ml: "auto",
                        transition: "background-color 0.3s", 
                        ":hover": {
                            background: "rgba(157, 157, 198, 0.6)",
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        id="modal-title"
                        sx={{ display: "flex", alignItems: "center", justifyContent: 'center', marginBottom: '0' }}
                        gutterBottom
                    >
                        {horaFormatada}
                        <AssistantPhotoIcon sx={{ ml: '0.5rem'}} />
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center',
                        width: "16%",
                        height: "7vh",
                        background: "rgba(152, 152, 152, 0.11)",
                        padding: "10px 15px",
                        borderRadius: "15px",
                        m: '0',
                        transition: "background-color 0.3s", 
                        ":hover": {
                            background: "rgba(157, 157, 198, 0.6)",
                        },
                    }}
                >
                    <Typography
                            variant="h6"
                            id="modal-title"
                            sx={{ display: "flex", alignItems: "center", marginBottom: '0' }}
                            gutterBottom
                        >   
                            <Avatar 
                                sx={{ 
                                    bgcolor: deepOrange[500],
                                    width: '50px',
                                    height: '50px',
                                    mr: '1rem'
                                }}
                            >
                                {userData?.nome ? userData.nome[0].toUpperCase() : "N"}
                            </Avatar>
                            {userData?.nome || "Nome do Usuário"}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}