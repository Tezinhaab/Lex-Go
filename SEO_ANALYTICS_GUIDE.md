# Guia de SEO e Analytics - Lex GO

## PWA (Progressive Web App)

O Lex GO agora é um PWA completo! Isso significa:

### Recursos PWA Implementados:
- **Instalável**: Usuários podem instalar o app no celular/desktop
- **Offline**: Funciona sem internet após primeira visita
- **Rápido**: Cache inteligente para carregamento instantâneo
- **Ícones**: Ícones otimizados para todas as plataformas

### Como Instalar (Usuários):
**No celular (Android/iOS):**
1. Acesse o site no navegador
2. Toque no menu (⋮) 
3. Selecione "Adicionar à tela inicial"
4. Pronto! O app aparecerá como aplicativo nativo

**No desktop (Chrome/Edge):**
1. Acesse o site
2. Clique no ícone de instalação (+) na barra de endereço
3. Clique em "Instalar"

---

## Analytics

### Vercel Analytics (Já Configurado)
O Vercel Analytics está ativo e rastreando:
- Visualizações de página
- Tempo de carregamento
- Taxa de rejeição
- Dispositivos e navegadores
- Localização geográfica

**Acesso:** Dashboard da Vercel → Seu projeto → Analytics

### Vercel Speed Insights (Já Configurado)
Monitora performance em tempo real:
- Core Web Vitals (LCP, FID, CLS)
- Tempo de carregamento por página
- Performance Score

### Google Analytics (Configuração Necessária)

**Passo 1: Criar conta Google Analytics**
1. Acesse: https://analytics.google.com
2. Crie uma propriedade para o Lex GO
3. Copie seu ID de medição (formato: G-XXXXXXXXXX)

**Passo 2: Adicionar ID no código**
No arquivo `app/layout.tsx`, linha 95, substitua:
\`\`\`typescript
gtag('config', 'G-XXXXXXXXXX');
\`\`\`
Por:
\`\`\`typescript
gtag('config', 'SEU-ID-AQUI');
\`\`\`

**Passo 3: Verificar**
- Acesse o site
- Vá para Google Analytics → Relatórios em tempo real
- Você deve aparecer como visitante ativo

---

## SEO (Search Engine Optimization)

### Otimizações Implementadas:

#### 1. Meta Tags Completas
- Título otimizado com palavras-chave
- Descrição atraente e informativa
- Keywords relevantes para direito e OAB
- Canonical URL para evitar conteúdo duplicado

#### 2. Open Graph (Redes Sociais)
Quando alguém compartilhar o link:
- Aparece imagem do logo
- Título e descrição personalizados
- Otimizado para Facebook, LinkedIn, WhatsApp

#### 3. Twitter Cards
Compartilhamentos no Twitter/X mostram:
- Card grande com imagem
- Título e descrição otimizados

#### 4. Structured Data (JSON-LD)
- Google entende que é uma organização educacional
- Melhora aparência nos resultados de busca
- Pode gerar rich snippets

#### 5. Sitemap e Robots.txt
- `sitemap.xml`: Lista todas as páginas para o Google
- `robots.txt`: Permite indexação completa

### Próximos Passos para SEO:

**1. Google Search Console**
- Acesse: https://search.google.com/search-console
- Adicione o site
- Envie o sitemap: `https://seu-dominio.com/sitemap.xml`

**2. Atualizar URLs**
Quando tiver domínio próprio, atualize em:
- `app/layout.tsx` → metadataBase
- `public/sitemap.xml` → URLs
- `public/robots.txt` → Sitemap URL

**3. Conteúdo**
Para melhor SEO, adicione:
- Blog com artigos jurídicos
- Páginas de destino para cada área do direito
- FAQ sobre OAB e estudos jurídicos

**4. Backlinks**
- Parcerias com faculdades de direito
- Guest posts em blogs jurídicos
- Diretórios de educação

---

## Monitoramento

### Métricas Importantes:

**Tráfego:**
- Visitantes únicos/dia
- Páginas mais visitadas
- Taxa de rejeição (ideal: < 50%)

**Engajamento:**
- Tempo médio no site (ideal: > 3 minutos)
- Páginas por sessão (ideal: > 2)
- Taxa de retorno

**Performance:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Conversão:**
- Taxa de cadastro
- Lições completadas
- Usuários ativos diários

---

## Checklist de Lançamento

- [x] PWA configurado
- [x] Service Worker ativo
- [x] Manifest.json criado
- [x] Ícones PWA gerados
- [x] Vercel Analytics ativo
- [x] Speed Insights ativo
- [ ] Google Analytics ID configurado
- [ ] Google Search Console configurado
- [ ] Sitemap enviado ao Google
- [ ] Domínio próprio configurado
- [ ] URLs atualizadas no código
- [ ] Testes de compartilhamento social
- [ ] Teste de instalação PWA em dispositivos

---

## Suporte

Para dúvidas sobre analytics e SEO:
- Vercel Analytics: https://vercel.com/docs/analytics
- Google Analytics: https://support.google.com/analytics
- PWA: https://web.dev/progressive-web-apps/
