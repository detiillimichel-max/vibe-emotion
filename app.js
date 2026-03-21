import { Cache } from './cache.js';
import { carregar } from './vibe.js';

export const App = {
    async inicializar(db) {
        if (Cache.isFresh()) {
            console.log("⚡ Modo Economia: Usando Cache.");
            return Cache.get();
        }
        const dados = await carregar(db);
        Cache.set(dados);
        return dados;
    },
    navegarParaChat: () => { 
        window.location.href = 'https://vibe-mensagens.vercel.app/'; 
    }
};

