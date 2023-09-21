import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

import img1 from './../../../../public/bg-fundo.jpg';
import img2 from './../../../../public/images/img1.png';
import img3 from './../../../../public/images/img2.png';
import img4 from './../../../../public/images/img3.png';
import img5 from './../../../../public/images/img4.png';
import img6 from './../../../../public/images/img5.png';

import Images from "./Images";

export default function ModalBackground({ isOpen, onClose }: IModalTarefasProps) {
    const [selectedImage, setSelectedImage] = useState(null)

    const teste = 'img6.png'

    const handleImageSelect = () => {
        const img = 'img7.png'
        const imageSrc = `./../../../public/images/${img}`
        localStorage.setItem("imagemSelecionada", imageSrc);

        console.log(imageSrc)

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
                                Estilize suas tarefas!
                            </Typography>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={() => onClose()}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>

                            {/* As imagens aqui */}
                        
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gridGap: '10px',
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                margin: '0 auto'
                            }}
                        >
                            <Box
                                onClick={handleImageSelect}
                            >
                                <Images src={img1} alt="Imagem1" />
                            </Box>
                            {/* <Images src={img2} alt="Imagem1" onClick={() => handleImageSelect(img2)} />
                            <Images src={img3} alt="Imagem1" onClick={() => handleImageSelect(img3)} />
                            <Images src={img4} alt="Imagem1" onClick={() => handleImageSelect(img4)} />
                            <Images src={img5} alt="Imagem1" onClick={() => handleImageSelect(img5)} />
                            <Images src={img6} alt="Imagem1" onClick={() => handleImageSelect(img6)} /> */}
                        </Box>

                    </Box>
                </div>
            </Modal>
        </>
    )
}