'use client'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CadastroForm() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false)
    const [mostrarConfirmeSenha, setMostrarConfirmeSenha] = useState<boolean>(false)
    const [mensagem, setMensagem] = useState('');
    const [mensagemTipo, setMensagemTipo] = useState<any>('');
    const [isLoading, setLoading] = useState(false);
    const router = useRouter()

    const handleClickMostrarSenha = (): void => {
        setMostrarSenha(mostrarSenha => !mostrarSenha)
    }
    
    const handleClickMostrarConfirmeSenha = (): void => {
        setMostrarConfirmeSenha(mostrarConfirmeSenha => !mostrarConfirmeSenha)
    }

    const handleCadastro = (): void => {
        setLoading(true);
        if (!nome || !email || !senha || !confirmeSenha) {
            exibirMensagem('Preencha todos os dados!', 'error');
            setLoading(false);
            return;
        }

        if (!isValidEmail(email)) {
            exibirMensagem('Digite um email válido!', 'error');
            setLoading(false);
            return;
        }

        if (senha.length < 8) {
            exibirMensagem('A senha deve ter pelo menos 8 caracteres!', 'error');
            setLoading(false);
            return;
        }

        if (senha !== confirmeSenha) {
            exibirMensagem('As senhas não correspondem!', 'error');
            setLoading(false);
            return;
        }

        const novoUsuario = {
            id: generateUniqueId(), 
            nome,
            email,
            senha,
        };

        const storedUsuarios = localStorage.getItem('usuarios');

        const usuarios = storedUsuarios ? JSON.parse(storedUsuarios) : [];

        usuarios.push(novoUsuario);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        exibirMensagem('Cadastro bem-sucedido!', 'success');

        setTimeout(() => {
            router.replace('/login')
        }, 2000);
    }

    const exibirMensagem = (texto: string, tipo: string) => {
        setMensagem(texto);
        setMensagemTipo(tipo);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const { v4: uuidv4 } = require('uuid');

    const generateUniqueId = () => {
        return uuidv4();
    };
    return (
        <>
            <Box
                sx={{
                    margin: 'auto 0',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '80%'
                }}
            >
                <Typography component="h1" variant="h5">
                   Cadastre-se
                </Typography>
                <Box width="100%">
                    {mensagem && (
                        <Alert severity={mensagemTipo} style={{ marginTop: '1rem' }}>
                            {mensagem}
                        </Alert>
                    )}
                    <TextField 
                        variant="outlined"
                        label="Nome"
                        name="Nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        fullWidth
                        sx={{
                            marginTop: '1rem'
                        }}
                    />
                    <TextField 
                        variant="outlined"
                        label="Email"
                        name="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        sx={{
                            marginTop: '1rem'
                        }}
                    />
                    <TextField 
                        variant="outlined"
                        label="Senha"
                        name="Senha"
                        type={mostrarSenha ? 'text' : 'password'}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        fullWidth
                        inputProps={{
                            'data-ignored': 'true'
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickMostrarSenha}
                                edge="end"
                                >
                                {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                        sx={{
                            marginTop: '1rem'
                        }}
                    />
                    <TextField 
                        variant="outlined"
                        label="Confirme Sua Senha"
                        name="confirmeSenha"
                        type={mostrarConfirmeSenha ? 'text' : 'password'}
                        value={confirmeSenha}
                        onChange={(e) => setConfirmeSenha(e.target.value)}
                        fullWidth
                        inputProps={{
                            'data-ignored': 'true'
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickMostrarConfirmeSenha}
                                edge="end"
                                >
                                {mostrarConfirmeSenha ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                        sx={{
                            marginTop: '1rem'
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleCadastro}
                        disabled={isLoading}
                        sx={{
                            marginTop: '1rem'
                        }}
                    >
                    {isLoading ? <CircularProgress size={24} /> : 'Cadastrar'}
                    </Button>
                    <Box sx={{ marginTop: '1rem' }}>
                        <Link href="/login">Já tem conta?</Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CadastroForm;