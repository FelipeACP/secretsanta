export const pt = {
  language: {
    flag: "🇧🇷",
    name: "Português",
  },
  errors: {
    needMoreParticipants: "É necessário ter pelo menos 2 participantes!",
    invalidPairs:
      "Não foi possível gerar pares válidos com as regras atuais. Verifique as regras e tente novamente.",
    multipleMustRules: "Múltiplas regras MUST encontradas",
    conflictingRules: "Uso conflitante de uma regra MUST e uma regra MUST NOT",
    emptyName: "Nome vazio",
    duplicateName: "Nome duplicado: {{name}}",
    invalidRuleFormat: "Formato de regra inválido: {{rule}}",
    unknownParticipant: "Participante desconhecido na regra: {{name}}",
    noValidReceivers:
      "Não há destinatários válidos restantes para este participante",
    line: "Linha {{number}}",
  },
  home: {
    vanity: "Projeto iniciado no inverno de 2015 por Maël",
    sponsor: "Apoie-me no GitHub",
    title: "Planejador de Amigo Secreto",
    explanation: [
      "Bem-vindo! Esta ferramenta ajudará a organizar suas trocas de presentes. Basta listar todos os participantes e nós atribuíremos pares aleatoriamente conforme as regras que você definir.",
      "Você receberá um link único para cada participante, que deverá compartilhar você mesmo (por e‑mail, Slack, etc). [<exampleLink>Link de exemplo</exampleLink>]",
      "Sem contas, sem e‑mails, sem complicação, e tudo hospedado no <githubLink>GitHub Pages</githubLink> sem backend!",
    ]
      .map((line) => `<p>${line}</p>`)
      .join(""),
    exampleLink: "Link de exemplo",
  },
  pairing: {
    title: "Seu Amigo Secreto",
    assignment:
      "Bem-vindo, <name/>! Você foi escolhido para dar um presente para:",
    loading: "Carregando...",
    error: "Falha ao descriptografar a mensagem. O link pode ser inválido.",
    startYourOwn: "Iniciar um Amigo Secreto!",
  },
  participants: {
    title: "Participantes",
    generationWarning:
      "Importante: Qualquer alteração na lista de participantes ou nas configurações exigirá a criação de novos pares. Os links existentes não serão modificados retroativamente.",
    addPerson: "Adicionar Pessoa",
    generatePairs: "Gerar Pareamentos",
    enterName: "Digite o nome do participante",
    editRules: "Editar regras",
    removeParticipant: "Remover participante",
    rulesCount_one: "{{count}} conjunto de regras",
    rulesCount_other: "{{count}} conjuntos de regras",
    switchToFormView: "Alternar para a visualização em formulário",
    switchToTextView: "Alternar para a visualização em texto",
  },
  rules: {
    title: "Regras para {{name}}",
    mustBePairedWith: "Deve ser pareado com",
    mustNotBePairedWith: "Não deve ser pareado com",
    selectParticipant: "Selecione outro participante",
    removeRule: "Remover regra",
    addMustRule: "Forçar um pareamento",
    addMustNotRule: "Impedir um pareamento",
    cancel: "Cancelar",
    saveRules: "Salvar regras",
    hintLabel: "Sugestão de presente",
    hintPlaceholder:
      "Digite uma dica sobre preferências de presente (opcional)",
  },
  links: {
    title: "Links para Compartilhar",
    warningParticipantsChanged:
      "Aviso: Participantes ou regras foram alterados desde a última vez que esses links foram gerados.",
    resetAssignments: "Regenerar Atribuições",
    shareInstructions:
      "Compartilhe apenas esses links com o doador correspondente",
    exportCSV: "Exportar como CSV",
    copySecretLink: "Copiar link secreto",
    linkCopied: "Copiado para a área de transferência!",
    for: "para",
  },
  settings: {
    title: "Configurações",
    instructions: "Instruções adicionais",
    instructionsPlaceholder: "ex.: orçamento, data, local...",
    instructionsHelp:
      "Serão exibidas para todos os participantes na página de atribuição. Mantenha curto: aumenta o tamanho dos links.",
  },
  giftSuggestions: {
    menuTitle: "Sugestões de Presentes",
    pageTitle: "Sugestões de Presentes",
    loading: "Carregando sugestões...",
    error: "Erro ao carregar as sugestões. Tente novamente mais tarde.",
    retryButton: "Tentar Novamente",
    emptyList: "Nenhuma sugestão de presente disponível no momento.",
    tablePerson: "Pessoa",
    tableGift: "Presente",
    tableDetails: "Detalhes",
    tableLink: "Link",
    buyButton: "Comprar",
    viewLink: "Ver Link",
  },
};
