'use client'
export const isAuthenticated = () => {
    const storedUserData = localStorage.getItem('usuarioLogado');
    return !!storedUserData; // Retorna true se o usuário estiver autenticado, caso contrário, false
};
