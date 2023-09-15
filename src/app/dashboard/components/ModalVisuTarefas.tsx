'use client'
import { 
    Alert, 
    Box, 
    Button, 
    CircularProgress, 
    IconButton, 
    Modal, 
    TextField, 
    Typography 
    } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect } from "react";
import { Tarefa } from "@/types/tarefa";

export default function ModalVisuTarefas({ isOpen, onClose, tarefaSelecionada }: IModalVisuTarefasProps) {
    const [mensagem, setMensagem] = React.useState('');
    const [mensagemTipo, setMensagemTipo] = React.useState<any>('');
    const [modoEdicao, setModoEdicao] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    const [titulo, setTitulo] = React.useState('');
    const [conteudo, setConteudo] = React.useState('');
    const [prazoInicial, setPrazoInicial] = React.useState('');
    const [prazoFinal, setPrazoFinal] = React.useState('');
    const [cor, setCor] = React.useState('');

    useEffect(() => {
        if (tarefaSelecionada) {
            if (modoEdicao) {
                setTitulo(titulo);
                setConteudo(conteudo);
                setPrazoInicial(prazoInicial);
                setPrazoFinal(prazoFinal);
                setCor(cor);
            } else {
                setTitulo(tarefaSelecionada.titulo);
                setConteudo(tarefaSelecionada.conteudo);
                setPrazoInicial(tarefaSelecionada.prazoInicial);
                setPrazoFinal(tarefaSelecionada.prazoFinal);
                setCor(tarefaSelecionada.cor);
            }
        }
    }, [conteudo, cor, modoEdicao, prazoFinal, prazoInicial, titulo, tarefaSelecionada]);

    const handleSalvarClick = () => {
        setModoEdicao(false); 
        if (!titulo && !conteudo && !prazoInicial && !prazoFinal && !cor) {
            exibirMensagem('Nenhuma alteração foi feita.', 'info');
            return;
        }

        setLoading(true);

        const usuarioLogadoString = localStorage.getItem('usuarioLogado');

        if (usuarioLogadoString !== null) {
            const usuarioLogado = JSON.parse(usuarioLogadoString);
            const userId = usuarioLogado.id;

            const storedTarefas = localStorage.getItem('tarefas');
            const tarefas = storedTarefas ? JSON.parse(storedTarefas) : [];

            const tarefaEditada = {
                ...tarefaSelecionada,
                titulo: titulo || tarefaSelecionada.titulo,
                conteudo: conteudo || tarefaSelecionada.conteudo,
                prazoInicial: prazoInicial || tarefaSelecionada.prazoInicial,
                prazoFinal: prazoFinal || tarefaSelecionada.prazoFinal,
                cor: cor || tarefaSelecionada.cor
            };

            const tarefasAtualizadas = tarefas.map((tarefa: Tarefa) =>
                tarefa.id === tarefaSelecionada.id && tarefa.userId === userId
                    ? tarefaEditada
                    : tarefa
            );

            localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));

            exibirMensagem('Tarefa editada com sucesso!', 'success');

            setLoading(false);

            setTimeout(() => {
                onClose();
            }, 1000);
        }
    }

    const handleEditarClick = () => {
        setModoEdicao(true); 
    }
    
    const handleExcluirClick = async (): Promise<void> => {
        setLoading(true);

        const usuarioLogadoString = localStorage.getItem('usuarioLogado');

        if (usuarioLogadoString !== null) {
            const usuarioLogado = JSON.parse(usuarioLogadoString);
            const userId = usuarioLogado.id;

            const storedTarefas = localStorage.getItem('tarefas');
            const tarefas = storedTarefas ? JSON.parse(storedTarefas) : [];

            exibirMensagem('Tarefa excluída com sucesso!', 'success');

            await new Promise((resolve) => setTimeout(resolve, 2000));

            setLoading(false);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            const tarefasRestantes = tarefas.filter((tarefa: Tarefa) => tarefa.id !== tarefaSelecionada.id || tarefa.userId !== userId);

            localStorage.setItem('tarefas', JSON.stringify(tarefasRestantes));

            onClose();
        }
    };

    const exibirMensagem = (texto: string, tipo: string) => {
        setMensagem(texto);
        setMensagemTipo(tipo);
    };

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            outline: 'none',
                            maxWidth: '90%',
                            width: '80%',
                            height: '80vh',
                            maxHeight: '90%',
                            overflow: 'auto',
                            borderRadius: '8px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px'
                              }}
                        >
                            <Typography id="modal-title" variant="h6" component="h2">
                                Sua tarefa
                            </Typography>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    onClose(); 
                                }}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ marginBottom: '16px' }}>
                            {mensagem && (
                                <Alert severity={mensagemTipo} style={{ marginTop: '1rem' }}>
                                    {mensagem}
                                </Alert>
                            )}
                        </Box>

                        <form action="">
                            <Box sx={{ marginBottom: '16px' }}>
                                <TextField 
                                    disabled={!modoEdicao}
                                    variant="outlined"
                                    label="Nome da tarefa"
                                    name="Nome da tarefa"
                                    type="text"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    onBlur={() => {}}
                                    fullWidth
                                    sx={{
                                        marginBottom: '1rem'
                                    }}
                                />

                                <TextField
                                    disabled={!modoEdicao}
                                    label="Descrição"
                                    multiline
                                    minRows={6}
                                    maxRows={12}
                                    fullWidth
                                    value={conteudo}
                                    onChange={(e) => setConteudo(e.target.value)}
                                    sx={{
                                        marginBottom: '1rem'
                                    }}
                                />

                                <TextField 
                                    disabled={!modoEdicao}
                                    label="Prazo inicial"
                                    name="Prazo inicial"
                                    type="date"
                                    value={prazoInicial}
                                    onChange={(e) => setPrazoInicial(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        classes: {
                                            input: 'custom-date-input',
                                        },
                                    }}
                                    sx={{
                                        marginBottom: '1rem'
                                    }}
                                />
                                
                                <TextField 
                                    disabled={!modoEdicao}
                                    label="Prazo Final"
                                    name="Prazo final"
                                    type="date"
                                    value={prazoFinal}
                                    onChange={(e) => setPrazoFinal(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                 <TextField
                                    disabled={!modoEdicao}
                                    type="color"
                                    label="Cor da tarefa"
                                    value={cor}
                                    onChange={(e) => setCor(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />

                                {modoEdicao ? (
                                    <Button
                                        variant="outlined" 
                                        onClick={handleSalvarClick}
                                        sx={{
                                            mr: 2
                                        }}
                                    >
                                        Salvar
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined" 
                                        onClick={handleEditarClick}
                                        sx={{
                                            mr: 2
                                        }}
                                    >
                                        Editar
                                    </Button>
                                )}
                                <Button
                                    variant="outlined" 
                                    onClick={handleExcluirClick}
                                >
                                    {isLoading ? <CircularProgress size={24} /> : 'Excluir'}
                                </Button>
                            </Box>
                        </form>

                    </Box>
                </div>
            </Modal>
        </>
    )
}