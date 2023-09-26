'use client'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useSession } from 'next-auth/react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from '../../../styles/login.module.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false)
    const [mensagem, setMensagem] = useState('');
    const [mensagemTipo, setMensagemTipo] = useState<any>('');
    const [isLoading, setLoading] = useState(false);
    
    const router = useRouter()
    const session = useSession();

    if(session.status ==="loading"){
        return <p>Carregando....</p>
    }

    // if(session.status ==="authenticated"){
    //     console.log(session)
    //     return <Alert>Voce está logado com o google!</Alert>
    // }

    const handleClickMostrarSenha = (): void => {
        setMostrarSenha(mostrarSenha => !mostrarSenha)
    }

    const handleLogin = (): void => {
        setLoading(true);
        if (!email || !senha) {
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

        const storedUsuarios = localStorage.getItem('usuarios');

        if (!storedUsuarios) {
            exibirMensagem('Nenhum usuário cadastrado!', 'error');
            setLoading(false);
            return;
        }

        const usuarios = JSON.parse(storedUsuarios);

        const usuarioEncontrado = usuarios.find((usuario: any) => {
            return usuario.email === email && usuario.senha === senha;
        });

        if (usuarioEncontrado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            exibirMensagem('Login bem-sucedido!', 'success');
            setTimeout(() => {
                router.replace('/dashboard'); 
            }, 2000);
        } else {
            exibirMensagem('Credenciais inválidas!', 'error');
            setLoading(false);
        }
    }

    const exibirMensagem = (texto: string, tipo: string) => {
        setMensagem(texto);
        setMensagemTipo(tipo);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
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
                   Login
                </Typography>
                <Box width="100%">
                    {mensagem && (
                        <Alert severity={mensagemTipo} style={{ marginTop: '1rem' }}>
                            {mensagem}
                        </Alert>
                    )}
                    <TextField 
                        variant="outlined"
                        label="Email"
                        name="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
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
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
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
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={isLoading}
                        sx={{
                            marginTop: '1rem'
                        }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
                    </Button>
                    <Box sx={{ marginTop: '1rem' }}>
                        <Typography
                            textAlign="center"
                            variant="body1"
                            margin="auto 0"
                            className={styles.firstAccess}
                        >
                            <Link
                                href="/cadastro"
                            >
                                Crie sua conta aqui
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LoginForm;