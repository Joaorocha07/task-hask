import { useEffect, useState } from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Tarefa } from "@/types/tarefa"
import { Box } from "@mui/material"
import { ptBR } from 'date-fns/locale'
import moment from 'moment'

const localizer = momentLocalizer(moment, {
    format: {
      dateFormat: 'dd/MM/yyyy',
    },
    culture: ptBR,
  });

export default function Calendario() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([])

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
      
    const eventos = tarefas.map((tarefa: Tarefa) => ({
        title: tarefa.titulo,
        start: new Date(tarefa.prazoInicial),
        end: new Date(tarefa.prazoFinal),
        color: tarefa.cor
    }))      
    return (
        <>
            <Box
                sx={{
                    color: 'black'
                }}
            >
                <div style={{ height: '500px' }}>
                <Calendar
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ backgroundColor: 'white' }}
                    className="meu-calendario" // Adicione uma classe personalizada
                    eventWrapperAccessor="evento-wrapper" // Classe para eventos
                />

                </div>
            </Box>
        </>
    )
}

