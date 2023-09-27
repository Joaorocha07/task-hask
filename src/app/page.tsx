import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png"
import joao from '../../public/pessoas/joao.png';
import arthur from '../../public/pessoas/arthur.png';
import samuel from '../../public/pessoas/samuel.png';
import monique from '../../public/pessoas/monique.png';
import brennda from '../../public/pessoas/brennda.png';
import marcos from '../../public/pessoas/marcos.png';

export default function Home() {
  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          top: "10rem",
          justifyContent: "space-between",
          height: "10vh",
          width: "100%",
          background: "black",
          m: "auto"
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "3rem",
            mt: "1.2rem"
          }}
        >
          <Typography>
            <Image
              src={logo}
              width={90}
              height={90}
              alt="Logo"
            />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "3.5rem"
          }}
        >
          <Typography sx={{ mr: "3rem" }}>
            <Link style={{ color: "white", textDecoration: "none" }} href="/login">Login</Link>
          </Typography>
          <Typography>
            <Link style={{ color: "white", textDecoration: "none" }} href="/cadastro">Cadastre-se</Link>
          </Typography>
        </Box>
      </Card>

      <Card 
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: "-40%",
          right: "-15%",
          width: "1000px",
          height: "1000px",
          backgroundColor: "black",
          borderRadius: "50%"
        }}  
      >
        <Image 
          style={{ margin: "200rem" }}
          src={logo}
          height={310}
          width={310}
          alt="Logo"
        />
      </Card>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%", 
          height: "90vh",
          border: "none"
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            margin: "45rem"
          }}
        >
          <Typography sx={{ color: "black" }}>
            Um aplicativo de gerenciamento de tarefas 
            é uma aplicação digital que permite aos 
            usuários criar, organizar, priorizar e 
            acompanhar tarefas e afazeres diários. 
            Ele oferece uma plataforma centralizada 
            para planejar seu dia, semana ou mês, 
            garantindo que você não esqueça compromissos 
            importantes e possa cumprir suas metas de 
            forma eficaz.
          </Typography>
        </Box>
      </Card>

      <Card
        sx={{
          display: "flex",
          justifyContent: "right",
          position: "absolute",
          top: "88%",
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          borderRadius: "50%",
          ml: "1.5rem"
        }}
      >
        <Image
          src={joao}
          width={120}
          height={120}
          alt="Logo"
        />
      </Card>

      <Card
        sx={{
          display: "flex",
          justifyContent: "right",
          position: "absolute",
          top: "88%",
          left: "8%",
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          borderRadius: "50%",
          ml: "1.5rem"
        }}
      >
        <Image
          src={samuel}
          width={120}
          height={120}
          alt="Logo"
        />
      </Card>

      <Card
        sx={{
          display: "flex",
          justifyContent: "right",
          position: "absolute",
          top: "88%",
          left: "16%",
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          borderRadius: "50%",
          ml: "1.5rem"
        }}
      >
        <Image
          src={marcos}
          width={120}
          height={120}
          alt="Logo"
        />
      </Card>
      
      <Card
        sx={{
          display: "flex",
          justifyContent: "right",
          position: "absolute",
          top: "88%",
          left: "24%",
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          borderRadius: "50%",
          ml: "1.5rem"
        }}
      >
        <Image
          src={arthur}
          width={120}
          height={120}
          alt="Logo"
        />
      </Card>
      
      <Card
        sx={{
          display: "flex",
          justifyContent: "right",
          position: "absolute",
          top: "88%",
          left: "32%",
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          borderRadius: "50%",
          ml: "1.5rem"
        }}
      >
        <Image
          src={brennda}
          width={120}
          height={120}
          alt="Logo"
        />
      </Card>
      
      <Card
        sx={{
          display: "flex",
          justifyContent: "right",
          position: "absolute",
          top: "88%",
          left: "40%",
          width: "100px",
          height: "100px",
          backgroundColor: "black",
          borderRadius: "50%",
          ml: "1.5rem"
        }}
      >
        <Image
          src={monique}
          width={120}
          height={120}
          alt="Logo"
        />
      </Card>
    </>
  )
}
