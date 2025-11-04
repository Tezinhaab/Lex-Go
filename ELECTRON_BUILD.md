# Lex GO - Guia de Build Desktop

Este guia explica como construir e distribuir o Lex GO como aplicativo desktop usando Electron.

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Para builds Windows: Windows 10+
- Para builds macOS: macOS 10.13+
- Para builds Linux: Ubuntu 18.04+ ou similar

## Desenvolvimento

### Executar em modo desenvolvimento

\`\`\`bash
# Instalar dependências
npm install

# Executar o app Electron em modo dev
npm run electron:dev
\`\`\`

Isso iniciará o servidor Next.js e abrirá o aplicativo Electron automaticamente.

## Build de Produção

### Build para Windows (.exe)

\`\`\`bash
npm run electron:build:win
\`\`\`

O instalador será gerado em `dist/Lex GO Setup 1.0.0.exe`

### Build para macOS (.dmg)

\`\`\`bash
npm run electron:build:mac
\`\`\`

O instalador será gerado em `dist/Lex GO-1.0.0.dmg`

### Build para Linux (.AppImage e .deb)

\`\`\`bash
npm run electron:build:linux
\`\`\`

Os instaladores serão gerados em:
- `dist/Lex GO-1.0.0.AppImage`
- `dist/lex-go_1.0.0_amd64.deb`

### Build para todas as plataformas

\`\`\`bash
npm run electron:build
\`\`\`

## Estrutura de Arquivos

\`\`\`
lex-go/
├── electron/
│   ├── main.js          # Processo principal do Electron
│   └── preload.js       # Script de preload para segurança
├── public/
│   ├── icon.ico         # Ícone Windows
│   ├── icon.icns        # Ícone macOS
│   └── icon.png         # Ícone Linux
├── app/                 # Código Next.js
└── package.json         # Configuração do Electron Builder
\`\`\`

## Recursos do App Desktop

- **Janela nativa**: Interface integrada ao sistema operacional
- **Menu personalizado**: Menu em português com atalhos de teclado
- **Ícone customizado**: Ícone do Juriton (mascote)
- **Auto-atualização**: Suporte para atualizações automáticas (configurável)
- **Instalador**: Instaladores nativos para cada plataforma
- **Offline**: Funciona completamente offline após instalação

## Personalização

### Alterar ícone do aplicativo

Substitua os arquivos em `public/`:
- `icon.ico` - Windows (256x256)
- `icon.icns` - macOS (512x512)
- `icon.png` - Linux (512x512)

### Configurar auto-atualização

Edite `package.json` e adicione:

\`\`\`json
"build": {
  "publish": {
    "provider": "github",
    "owner": "seu-usuario",
    "repo": "lex-go"
  }
}
\`\`\`

## Distribuição

### Windows
- Distribua o arquivo `.exe` gerado
- Usuários podem instalar com duplo clique
- Cria atalho no menu iniciar e desktop

### macOS
- Distribua o arquivo `.dmg` gerado
- Usuários arrastam para a pasta Applications
- Pode ser necessário assinar o app para distribuição na App Store

### Linux
- Distribua `.AppImage` (não requer instalação) ou `.deb` (para Debian/Ubuntu)
- AppImage: usuários dão permissão de execução e clicam
- DEB: usuários instalam com `sudo dpkg -i lex-go_1.0.0_amd64.deb`

## Troubleshooting

### Erro de build no Windows
- Certifique-se de ter o Visual Studio Build Tools instalado
- Execute: `npm install --global windows-build-tools`

### Erro de build no macOS
- Certifique-se de ter o Xcode Command Line Tools instalado
- Execute: `xcode-select --install`

### App não abre
- Verifique se todas as dependências foram instaladas
- Tente executar em modo dev primeiro: `npm run electron:dev`
- Verifique os logs do console

## Suporte

Para problemas ou dúvidas sobre o build desktop, consulte:
- [Documentação do Electron](https://www.electronjs.org/docs)
- [Documentação do Electron Builder](https://www.electron.build/)
