export const Uploader = {
    async enviar(db, file, autor) {
        // Regra Crítica: Máximo 800KB
        if (file.size > 800000) {
            alert("⚠️ Vídeo muito pesado! Limite OIO: 800KB.");
            return false;
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
            await db.ref('vibes').push({
                url: e.target.result,
                autor: autor,
                time: Date.now()
            });
            location.reload();
        };
        reader.readAsDataURL(file);
    }
};
