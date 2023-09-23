import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Paper, Typography, Box, Grid } from "@mui/material";
import { Tarefa } from "@/types/tarefa";

interface TarefasColunas {
    titulo: string
    tarefas: any
    droppableId: string
}

const TarefasColumn = ({ titulo, tarefas, droppableId }: TarefasColunas) => {
  return (
    <Grid item xs={4}>
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="h6">{titulo}</Typography>
          <Droppable droppableId={droppableId}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tarefas.map((tarefa: Tarefa, index: number) => (
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
  );
};

export default TarefasColumn;
