import { carregar } from './vibe.js';

export const App = {
    async inicializar(db) {
        // Busca direta sem travas de cache por enquanto para testar
        return await carregar(db);
    }
};
