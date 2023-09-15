interface IModalTarefasProps {
    isOpen: boolean
    onClose: () => void
}

interface IModalVisuTarefasProps {
    isOpen: boolean
    onClose: () => void
    tarefaSelecionada: Tarefa | null;
}