'use client'

import { InputAdornment, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function PesquisarTarefas({ onSearch }: any) {
    const [buscar, setBuscar] = React.useState('');

    const handleSearch = () => {
        const storedTarefas = localStorage.getItem('tarefas');
        const tarefas = storedTarefas ? JSON.parse(storedTarefas) : [];
        const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    
        if (usuarioLogadoString !== null) {
            const usuarioLogado = JSON.parse(usuarioLogadoString);
            const userId = usuarioLogado.id;
            const pesquisa = buscar.toLowerCase();
    
            const tarefasDoUsuarioFiltradas = tarefas.filter((tarefa: { userId: any; titulo: string; conteudo: string }) =>
                tarefa.userId === userId &&
                (tarefa.titulo.toLowerCase().includes(pesquisa) || tarefa.conteudo.toLowerCase().includes(pesquisa))
            );
    
            if (tarefasDoUsuarioFiltradas.length > 0) {
                localStorage.setItem('tarefasPesquisadas', JSON.stringify(tarefasDoUsuarioFiltradas));
                console.log(tarefasDoUsuarioFiltradas);
                localStorage.setItem('ultimaPesquisa', buscar);
            } else {
                localStorage.removeItem('tarefasPesquisadas');
            }
        }
    };
    
    return (
        <>
            <TextField
                label='Buscar'
                variant='outlined'
                size='small'
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                sx={{ 
                    width: '65%',
                    height: '40px', 
                    background: '#FFF',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    border: 'none',
                    borderColor: '#FFF',
                    margin: 'auto'
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment 
                            position='end' 
                            sx={{ cursor: 'pointer' }}
                        >
                            <Button 
                                onClick={handleSearch}
                                sx={{ 
                                    background: "transparent",
                                    border: "none", 
                                    cursor: "pointer", 
                                    padding: 0 
                                }}
                            >
                                <SearchIcon />
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}
