import { Box, Paper } from '@mui/material'
import type { Metadata } from 'next'

import styles from '../../styles/login.module.css'
import imageCadastro from './../../../public/img-task.jpg';

export const metadata: Metadata = {
  title: 'Página principal',
  description: 'Gerenciador de tarefas',
}

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Box
        position="absolute"
        width="100vw"
        height="100vh"
        sx={{
          backgroundImage: `url(${imageCadastro.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        className={styles.loginBackground} /><Box
          sx={{
            margin: '0 auto',
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backdropFilter: 'blur(5px) brightness(0.6)'
          }}
          className={styles.teste}
        >
          <Box
            className={styles.loginContainer}
            component={Paper}
            elevation={6}
            square
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {children}
            <Box
              component="footer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: 'auto',
                marginBottom: '20px',
                padding: '5px',
                width: '80%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10%',
                  width: '100%'
                }}
              >
              </Box>
            </Box>
          </Box>
          <Box
            className={styles.loginImage}
            component={Paper}
            square
            elevation={6}
            sx={{
              backgroundImage: `url(${imageCadastro.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
      </Box>
    </>
  )
}