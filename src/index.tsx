<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#1877f2">
    <link rel="manifest" href="/manifest.json">
    <title>OIO ONE | VIBE-APP</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* ESTILO BASE - PRETO LUXO */
        body, html { margin: 0; padding: 0; background: #000; color: white; font-family: sans-serif; height: 100%; overflow: hidden; }
        .hidden { display: none !important; }
        
        /* LOGIN */
        #portal-layer { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #000; padding: 20px; text-align: center; }
        .oio-logo { color: #1877f2; font-size: 50px; font-weight: 900; margin-bottom: 30px; letter-spacing: -2px; }
        input, select { width: 100%; background: #1c1e21; border: 1px solid #333; padding: 15px; border-radius: 12px; color: white; margin-bottom: 10px; box-sizing: border-box; outline: none; }
        .login-btn { width: 100%; background: #1877f2; color: white; border: none; padding: 15px; border-radius: 12px; font-weight: bold; cursor: pointer; }

        /* NAVEGAÇÃO SUPERIOR (QUANTUM NAV) */
        .main-nav { position: sticky; top: 0; background: #080808; display: flex; justify-content: space-around; padding: 12px 0; border-bottom: 1px solid #1a1a1a; z-index: 1000; }
        .nav-item { color: #555; font-size: 22px; cursor: pointer; flex: 1; text-align: center; transition: 0.3s; }
        .nav-item.active { color: #1877f2; }

        /* DISPLAY DE CONTEÚDO (UNIVERSO) */
        #universe-display { height: calc(100vh - 65px); overflow-y: auto; background: #000; padding: 15px; }
        .card-oio { background: #111; border-radius: 15px; padding: 15px; margin-bottom: 15px; border: 1px solid #222; }
        
        /* GRID BLOCO 6 */
        .grid-menu { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .menu-item { background: #111; padding: 15px; border-radius: 12px; text-align: center; border: 1px solid #222; font-size: 13px; }
        .menu-item i { display: block; color: #1877f2; margin-bottom: 8px; font-size: 20px; }
        
        /* PLAYER DE VÍDEO */
        video { width: 100%; border-radius: 12px; background: #000; margin-top: 10px; }
    </style>
</head>
<body>

    <div id="portal-layer">
        <div class="oio-logo">OIO</div>
        <input type="text" id="login-email" placeholder="Seu nome" style="max-width:300px">
        <input type="tel" id="login-pass" placeholder="Senha" maxlength="6" style="max-width:300px">
        <button id="btn-entrar" class="login-btn" style="max-width:300px">ACESSAR UNIVERSO</button>
    </div>

    <div id="app-layer" class="hidden">
        <nav class="main-nav">
            <div class="nav-item active" onclick="navegar('home', this)"><i class="fas fa-home"></i></div>
            <div class="nav-item" onclick="navegar('videos', this)"><i class="fas fa-play-circle"></i></div>
            <div class="nav-item" onclick="navegar('perfil', this)"><i class="fas fa-user-circle"></i></div>
            <div class="nav-item" onclick="navegar('market', this)"><i class="fas fa-store"></i></div>
            <div class="nav-item" onclick="navegar('notif', this)"><i class="fas fa-bell"></i></div>
            <div class="nav-item" onclick="navegar('bloco6', this)"><div style="width:22px; height:22px; background:#1877f2; border-radius:50%; margin:auto;"></div></div>
        </nav>
        
        <div id="universe-display">
            </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    
    <script>
        // CONEXÃO BLINDADA SUPABASE
        const supabaseUrl = 'https://uqdwtzlkqaosnweyoyit.supabase.co';
        const supabaseKey = 'sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA';
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        const display = document.getElementById('universe-display');

        // GERENCIADOR DE BLOCOS (A PASTA QUE VOCÊ SUGERIU)
        function navegar(bloco, elemento) {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            elemento.classList.add('active');

            if(bloco === 'videos') {
                // BLOCO 2: VÍDEOS COLETIVOS (SUPABASE REAL)
                display.innerHTML = `
                    <div class="card-oio">
                        <h3>OIO Reels | Global</h3>
                        <div id="feed-real">Carregando vídeos...</div>
                        <label class="login-btn" style="display:block; text-align:center; margin-top:10px;">
                            <i class="fas fa-video"></i> POSTAR VÍDEO
                            <input type="file" accept="video/*" class="hidden" onchange="uploadVibe(this)">
                        </label>
                    </div>`;
                puxarVideos();
            } 
            else if(bloco === 'perfil') {
                // BLOCO 3: MENSAGENS + PERFIL COMPLETO
                display.innerHTML = `
                    <div class="card-oio"><h3>Mensagens</h3><p>Chat sincronizado.</p></div>
                    <div class="card-oio">
                        <h3>Meu Perfil</h3>
                        <input id="p-cidade" placeholder="Cidade">
                        <input id="p-time" placeholder="Time que torce">
                        <input id="p-hobbies" placeholder="O que gosta">
                        <select id="p-status">
                            <option value="solteiro">Solteiro(a)</option>
                            <option value="casado">Casado(a)</option>
                        </select>
                        <button class="login-btn" onclick="salvarPerfil()">SALVAR NO UNIVERSO</button>
                    </div>`;
            }
            else if(bloco === 'bloco6') {
                // BLOCO 6: VISÃO COMPLETA (FERRAMENTAS)
                display.innerHTML = `
                    <div class="grid-menu">
                        <div class="menu-item"><i class="fas fa-bookmark"></i>Salvos</div>
                        <div class="menu-item"><i class="fas fa-users"></i>Grupos</div>
                        <div class="menu-item"><i class="fas fa-star"></i>Recomendação</div>
                        <div class="menu-item"><i class="fas fa-cloud"></i>Recordação</div>
                        <div class="menu-item"><i class="fas fa-cog"></i>Definições</div>
                        <div class="menu-item" style="color:#ff3040" onclick="location.reload()"><i class="fas fa-sign-out-alt"></i>SAIR</div>
                    </div>`;
            }
            else if(bloco === 'market') {
                display.innerHTML = `<div class="card-oio"><h3>Marketingplace</h3><p>Módulo funcional ativo.</p></div>`;
            }
            else {
                display.innerHTML = `<div class="card-oio"><h3>Home</h3><p>Bem-vindo ao OIO ONE.</p></div>`;
            }
        }

        // LÓGICA DE UPLOAD REAL (PARA O USUÁRIO 2 VER)
        async function uploadVibe(input) {
            const file = input.files[0];
            if(!file) return;
            alert("Subindo para o Universo...");
            const name = `vibe_${Date.now()}.mp4`;
            const { data, error } = await supabase.storage.from('videos').upload(name, file);
            if(!error) {
                const { data: url } = supabase.storage.from('videos').getPublicUrl(name);
                await supabase.from('posts_video').insert([{ url: url.publicUrl }]);
                puxarVideos();
            }
        }

        async function puxarVideos() {
            const { data } = await supabase.from('posts_video').select('*').order('created_at', {ascending: false});
            const feed = document.getElementById('feed-real');
            if(data) {
                feed.innerHTML = data.map(v => `<video src="${v.url}" controls></video>`).join('');
            }
        }

        // LOGIN SIMPLES PARA FUNCIONAR NO CELULAR AGORA
        document.getElementById('btn-entrar').onclick = () => {
            document.getElementById('portal-layer').classList.add('hidden');
            document.getElementById('app-layer').classList.remove('hidden');
            navegar('home', document.querySelector('.nav-item'));
        };
    </script>
    
    <script src="/js/push.js"></script>
    <script type="module" src="js/core/app-init.js"></script>
</body>
</html>
