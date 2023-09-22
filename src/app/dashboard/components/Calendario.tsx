import { useEffect, useState } from "react"
import { Tarefa } from "@/types/tarefa"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Box, Grid, Paper, Typography } from "@mui/material"

export default function Kanban() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([])

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

    const onDragEnd = ({ result }: any) => {
        if (!result.destination) {
          return;
        }
    
        const updatedTarefas = [...tarefas];
        const [reorderedItem] = updatedTarefas.splice(result.source.index, 1);
        updatedTarefas.splice(result.destination.index, 0, reorderedItem);
        setTarefas(updatedTarefas);

        localStorage.setItem("tarefas", JSON.stringify(updatedTarefas));
    };

    const tarefasAFazer = tarefas.filter((tarefa) => tarefa.categoria === "A fazer");
    const tarefasFazendo = tarefas.filter((tarefa) => tarefa.categoria === "Fazendo");
    const tarefasFeito = tarefas.filter((tarefa) => tarefa.categoria === "Feito");
           
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                            <Box p={2}>
                                <Typography variant="h6">A fazer</Typography>
                                <Droppable droppableId="a-fazer">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {/* Renderize as tarefas "A fazer" aqui */}
                                            {tarefasAFazer.map((tarefa, index) => (
                                            <Draggable
                                                key={tarefa.id}
                                                draggableId={tarefa.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {tarefa.titulo}
                                                </div>
                                                )}
                                            </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                            <Box p={2}>
                                <Typography variant="h6">Fazendo</Typography>
                                <Droppable droppableId="fazendo">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {/* Renderize as tarefas "Fazendo" aqui */}
                                            {tarefasFazendo.map((tarefa, index) => (
                                            <Draggable
                                                key={tarefa.id}
                                                draggableId={tarefa.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {tarefa.titulo}
                                                </div>
                                                )}
                                            </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                            <Box p={2}>
                                <Typography variant="h6">Feito</Typography>
                                <Droppable droppableId="feito">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {/* Renderize as tarefas "Feito" aqui */}
                                            {tarefasFeito.map((tarefa, index) => (
                                            <Draggable
                                                key={tarefa.id}
                                                draggableId={tarefa.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {tarefa.titulo}
                                                </div>
                                                )}
                                            </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </DragDropContext>
        </>
    )
}

