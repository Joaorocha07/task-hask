import { useEffect, useState } from "react"
import { Tarefa } from "@/types/tarefa"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Box, Grid, Paper, Typography } from "@mui/material"
import TarefasColumn from "./TarefasColunas"

export default function Kanban() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([])
    // const [tarefasAFazer, setTarefasAFazer] = useState<Tarefa[]>([])
    // const [tarefasFazendo, setTarefasFazendo] = useState<Tarefa[]>([])
    // const [tarefasFeito, setTarefasFeito] = useState<Tarefa[]>([])
    const usuarioLogadoString = localStorage.getItem('usuarioLogado')
    const usuarioLogado = usuarioLogadoString ? JSON.parse(usuarioLogadoString) : null

    useEffect(() => {
        const storedTarefas = localStorage.getItem('tarefas')
        if (storedTarefas) {
          setTarefas(JSON.parse(storedTarefas))
          console.log(tarefas)
        }
    
        const intervalId = setInterval(() => {
          const storedTarefas = localStorage.getItem('tarefas')
          if (storedTarefas) {
            setTarefas(JSON.parse(storedTarefas))
          }
        }, 600)
    
        return () => clearInterval(intervalId)
    }, [])

    // const onDragEnd = (result: any) => {
    //     if (!result || !result.destination) {
    //       return;
    //     }
      
    //     const userId = usuarioLogado ? usuarioLogado.id : null;
      
    //     if (userId !== null) {
    //       const updatedTarefas = [...tarefas];
    //       const [reorderedItem] = updatedTarefas.splice(result.source.index, 1);
    //       const movedTarefa = { ...reorderedItem, categoria: result.destination.droppableId }; // Atualize a categoria
    //       updatedTarefas.splice(result.destination.index, 0, movedTarefa);
      
    //       // Atualize o estado geral de tarefas
    //       setTarefas(updatedTarefas);
      
    //       // Atualize os estados intermediários com base na nova ordem
    //       const tarefasAFazerAtualizadas = updatedTarefas.filter((tarefa) =>
    //         tarefa.userId === userId && tarefa.categoria === "A fazer"
    //       );
    //       const tarefasFazendoAtualizadas = updatedTarefas.filter((tarefa) =>
    //         tarefa.userId === userId && tarefa.categoria === "Fazendo"
    //       );
    //       const tarefasFeitoAtualizadas = updatedTarefas.filter((tarefa) =>
    //         tarefa.userId === userId && tarefa.categoria === "Feito"
    //       );
      
    //       setTarefasAFazer(tarefasAFazerAtualizadas);
    //       setTarefasFazendo(tarefasFazendoAtualizadas);
    //       setTarefasFeito(tarefasFeitoAtualizadas);
      
    //       // Atualize o armazenamento local
    //       localStorage.setItem("tarefas", JSON.stringify(updatedTarefas));
    //     }
    //   };
    
    const onDragEnd = (result: any) => {
        if (!result || !result.destination) {
            return;
        }
    
        const userId = usuarioLogado ? usuarioLogado.id : null;
    
        if (userId !== null) {
            const updatedTarefas = [...tarefas];
            const [reorderedItem] = updatedTarefas.splice(result.source.index, 1);
            const movedTarefa = { ...reorderedItem, categoria: result.destination.droppableId }; // Atualize a categoria
            updatedTarefas.splice(result.destination.index, 0, movedTarefa);
            setTarefas(updatedTarefas);
    
            console.log(updatedTarefas)
    
            const tarefasDoUsuario = updatedTarefas.filter((tarefa) => tarefa.userId === userId);
            localStorage.setItem("tarefas", JSON.stringify(tarefasDoUsuario));
        }
    }
    

    const tarefasAFazer = 
        usuarioLogado ? tarefas.filter
        ((tarefa) => tarefa.userId === usuarioLogado.id && tarefa.categoria === "A fazer") : [];
    const tarefasFazendo = 
        usuarioLogado ? tarefas.filter
        ((tarefa) => tarefa.userId === usuarioLogado.id && tarefa.categoria === "Fazendo") : [];
    const tarefasFeito = 
        usuarioLogado ? tarefas.filter
        ((tarefa) => tarefa.userId === usuarioLogado.id && tarefa.categoria === "Feito") : [];
           
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={2}>
                    <TarefasColumn titulo="A fazer" tarefas={tarefasAFazer} droppableId="a-fazer" />
                    <TarefasColumn titulo="Fazendo" tarefas={tarefasFazendo} droppableId="fazendo" />
                    <TarefasColumn titulo="Feito" tarefas={tarefasFeito} droppableId="feito" />
                </Grid>
            </DragDropContext>
        </>
    )
}

