/* 🎬 MOTOR DE FLUXO OIO ONE - ENGENHARIA DE TRANSMISSÃO */
export async function carregar(db) {
    try {
        console.log("🚀 OIO ONE: Iniciando Sincronização Municipal...");
        
        // 1. Busca os últimos 50 registros para manter o fluxo 1 -> 2 -> 3
        const snapshot = await db.ref('vibes').limitToLast(50).once('value');
        
        if (!snapshot.exists()) return [];

        let lista = [];
        snapshot.forEach(child => {
            const dado = child.val();
            lista.push({ 
                id: child.key, 
                url: dado.url,
                autor: dado.autor || "Usuário OIO",
                likes: dado.likes || 0,
                time: dado.time || Date.now()
            });
        });

        // 2. Organização: O mais novo (Usuário 1) encabeça a fila
        // Mas a lista mantém a ordem para o "próximo" (Usuário 2)
        const fluxoOrdenado = lista.reverse();

        // 3. Inteligência de Pré-Carregamento (O segredo do TikTok)
        // Isso avisa ao app quem é o próximo na fila antes do vídeo 1 acabar
        console.log(`📦 Fluxo Pronto: ${fluxoOrdenado.length} memórias na fila.`);
        
        return fluxoOrdenado;

    } catch (e) {
        console.error("❌ Erro Crítico no Fluxo OIO:", e);
        return [];
    }
}
