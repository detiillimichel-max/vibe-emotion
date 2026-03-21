export const Cache = {
    get: () => JSON.parse(localStorage.getItem("vibe_cache") || "[]"),
    set: (data) => {
        localStorage.setItem("vibe_cache", JSON.stringify(data));
        localStorage.setItem("vibe_last", Date.now());
    },
    isFresh: () => {
        const last = localStorage.getItem("vibe_last");
        // Bloqueio de 10 minutos (600.000ms)
        return last && (Date.now() - last < 600000);
    }
};
