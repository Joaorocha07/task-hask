import { useEffect, useState } from "react"
import { Tarefa } from "@/types/tarefa"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Box, Grid, Paper, Typography } from "@mui/material"

export default function Kanban() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([])
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    const usuarioLogado = JSON.parse(usuarioLogadoString ?? '');

    useEffect(() => {
        const storedTarefas = localStorage.getItem('tarefas')
        if (storedTarefas) {
          setTarefas(JSON.parse(storedTarefas))
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
      if (!result || !result.destination) {
        return;
      }
    
      const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    
      if (usuarioLogadoString !== null) {
        const usuarioLogado = JSON.parse(usuarioLogadoString);
    
        const tarefasDoUsuario = tarefas.filter((tarefa) => tarefa.userId === usuarioLogado.id);
        const [reorderedItem] = tarefasDoUsuario.splice(result.source.index, 1);
        
        reorderedItem.categoria = result.destination.droppableId;

        console.log(reorderedItem)
    
        tarefasDoUsuario.splice(result.destination.index, 0, reorderedItem);
        setTarefas(tarefasDoUsuario);

        localStorage.setItem("tarefas", JSON.stringify(tarefas));
      }
    };       

    const tarefasDoUsuario = tarefas.filter((tarefa) => tarefa.userId === usuarioLogado.id);
           
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper elevation={3}>
                      <Box p={2}>
                        <Typography variant="h6">A fazer</Typography>
                        <Droppable droppableId="A fazer">
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                              {tarefasDoUsuario.filter((tarefa) => tarefa.categoria === "A fazer")
                                .map((tarefa: Tarefa, index: number) => (
                                  <Draggable key={tarefa.id} draggableId={tarefa.id} index={index}>
                                    {(provided) => (
                                      <Paper
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        elevation={3}
                                        sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          padding: '8px',
                                          marginBottom: '15px',
                                          backgroundColor: 'white',
                                          borderRadius: '4px',
                                          border: `2px solid ${tarefa.cor}`,
                                        }}
                                      >
                                        <Typography>{tarefa.titulo}</Typography>
                                        <Box
                                          sx={{
                                            backgroundColor: tarefa.cor,
                                            width: '100%',
                                            height: '8px',
                                            borderRadius: '8px 8px 8px 8px',
                                          }}
                                        />
                                      </Paper>
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
                        <Droppable droppableId="Fazendo">
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                              {tarefasDoUsuario.filter((tarefa) => tarefa.categoria === "Fazendo")
                                .map((tarefa: Tarefa, index: number) => (
                                <Draggable key={tarefa.id} draggableId={tarefa.id} index={index}>
                                  {(provided) => (
                                    <Paper
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      elevation={3}
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '8px',
                                        marginBottom: '15px',
                                        backgroundColor: 'white',
                                        borderRadius: '4px',
                                        border: `2px solid ${tarefa.cor}`,
                                      }}
                                    >
                                      <Typography>{tarefa.titulo}</Typography>
                                      <Box
                                        sx={{
                                          backgroundColor: tarefa.cor,
                                          width: '100%',
                                          height: '8px',
                                          borderRadius: '8px 8px 8px 8px',
                                        }}
                                      />
                                    </Paper>
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
                        <Droppable droppableId="Feito">
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                              {tarefasDoUsuario.filter((tarefa) => tarefa.categoria === "Feito")
                                .map((tarefa: Tarefa, index: number) => (
                                  <Draggable key={tarefa.id} draggableId={tarefa.id} index={index}>
                                    {(provided) => (
                                      <Paper
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        elevation={3}
                                        sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          padding: '8px',
                                          marginBottom: '15px',
                                          backgroundColor: 'white',
                                          borderRadius: '4px',
                                          border: `2px solid ${tarefa.cor}`,
                                        }}
                                      >
                                        <Typography>{tarefa.titulo}</Typography>
                                        <Box
                                          sx={{
                                            backgroundColor: tarefa.cor,
                                            width: '100%',
                                            height: '8px',
                                            borderRadius: '8px 8px 8px 8px',
                                          }}
                                        />
                                      </Paper>
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

