import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

interface Images {
    src: any
    alt: string
}

export default function Images({ src, alt }: Images) {
    return (
        <Box
            sx={{
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                padding: "12px 17px",
                height: "23vh",
                width: "70%",
                cursor: 'pointer'
            }}
        >
            <Image
                width={300}
                height={200}
                src={src}
                alt={alt}
            />
        </Box>
    );
}
