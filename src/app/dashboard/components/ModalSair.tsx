'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, CircularProgress, Modal } from '@mui/material'
import { useRouter } from 'next/navigation'

interface SelectPerfilProps {
  openModal: boolean
  setOpenModal: (value: boolean) => void
}

export default function ModalLogout({
  openModal,
  setOpenModal
}: SelectPerfilProps): JSX.Element {
  const [userData, setUserData] = React.useState<{ nome: string; email: string } | null>(null);
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter()

  const handleCloseModal = (): void => {
    setOpenModal(false)
  }

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem('usuarioLogado');
    setUserData(null);
    setTimeout(() => {
      router.replace('/login');
      setLoading(false);
      window.location.reload();
    }, 1500);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box
        sx={{
          width: 400,
          p: 5,
          bgcolor: 'background.paper',
          borderRadius: 4,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Typography variant="h5" id="logout-modal-description">
          Tem certeza que deseja sair?
        </Typography>
        <Button variant="outlined" onClick={handleCloseModal} sx={{ mt: 2 }}>
          Cancelar
        </Button>
        <Button
          onClick={handleLogout}
          variant="outlined"
          disabled={isLoading}
          sx={{ mt: 2, ml: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Sim, quero sair'}
        </Button>
      </Box>
    </Modal>
  )
}
