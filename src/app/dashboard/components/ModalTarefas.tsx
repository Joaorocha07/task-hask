'use client';

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
import React from "react";
import { Tarefa } from "@/types/tarefa";

export default function ModalTarefas({ isOpen, onClose }: IModalTarefasProps) {
    const [tarefas, setTarefas] = React.useState<Tarefa[]>([]);
    const [titulo, setTitulo] = React.useState('');
    const [conteudo, setConteudo] = React.useState('');
    const [prazoInicial, setPrazoInicial] = React.useState('');
    const [prazoFinal, setPrazoFinal] = React.useState('');
    const [cor, setCor] = React.useState('');

    const [tarefasContador, setTarefasContador] = React.useState<number>(0);
    const [mensagem, setMensagem] = React.useState('');
    const [mensagemTipo, setMensagemTipo] = React.useState<any>('');

    const [isLoading, setLoading] = React.useState(false);

    const handleCadastrarTarefa = async (): Promise<void> => {
        if (!titulo) {
            exibirMensagem('O nome da tarefa não foi especificado.', 'error');
            return;
        }

        setLoading(true);

        const usuarioLogadoString = localStorage.getItem('usuarioLogado');

        if (usuarioLogadoString !== null) {
            const usuarioLogado = JSON.parse(usuarioLogadoString);
            const userId = usuarioLogado.id;

            const novaTarefa = {
                id: generateUniqueId(),
                titulo,
                conteudo,
                prazoInicial,
                prazoFinal,
                cor,
                userId: userId,
            };

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const storedTarefas = localStorage.getItem('tarefas');

            const tarefas = storedTarefas ? JSON.parse(storedTarefas) : [];

            tarefas.push(novaTarefa);

            localStorage.setItem('tarefas', JSON.stringify(tarefas));

            exibirMensagem('Cadastro bem-sucedido!', 'success');

            setTarefas([...tarefas, novaTarefa]);

            setLoading(false);

            setTimeout(() => {
                onClose();
            }, 1000);

            setTitulo('');
            setConteudo('');
            setPrazoInicial('');
            setPrazoFinal('');
            setCor('');
        }
    };


    const exibirMensagem = (texto: string, tipo: string) => {
        setMensagem(texto);
        setMensagemTipo(tipo);
    };

    const { v4: uuidv4 } = require('uuid');

    const generateUniqueId = () => {
        return uuidv4();
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
                                Nova tarefa
                            </Typography>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={onClose}
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
                                    variant="outlined"
                                    label="Nome da tarefa"
                                    name="Nome da tarefa"
                                    type="text"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    fullWidth
                                    sx={{
                                        marginBottom: '1rem'
                                    }}
                                />

                                <TextField
                                    label="Descrição"
                                    multiline
                                    minRows={6}
                                    maxRows={12}
                                    fullWidth
                                    value={conteudo}
                                    onChange={(e) => setConteudo(e.target.value)}
                                    inputProps={{ maxLength: 2000 }}
                                    sx={{
                                        marginBottom: '1rem'
                                    }}
                                />

                                <TextField 
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
                                    type="color"
                                    label="Cor da tarefa"
                                    value={cor}
                                    onChange={(e) => setCor(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCadastrarTarefa}
                                    disabled={isLoading}
                                    sx={{
                                        marginTop: '1rem'
                                    }}
                                >
                                    {isLoading ? <CircularProgress size={24} /> : 'Cadastra Tarefa'}
                                </Button>

                            </Box>
                        </form>

                    </Box>
                </div>
            </Modal>
        </>
    )
}