// Gerador de documentos jurídicos profissionais

export async function generateLegalDocument(
  documentType: "minuta" | "peticao" | "contestacao" | "replica",
  context: string
): Promise<string> {
  const generators = {
    minuta: generateMinuta,
    peticao: generatePetition,
    contestacao: generateContestation,
    replica: generateReplica,
  }

  return generators[documentType](context)
}

function generateMinuta(context: string): string {
  return `MINUTA DE CONTRATO

Pelo presente instrumento particular, as partes:

CONTRATANTE: [Nome completo]
CONTRATADA: [Nome completo]

Têm entre si justo e contratado o seguinte:

CLÁUSULA PRIMEIRA - DO OBJETO
${context}

CLÁUSULA SEGUNDA - DO PRAZO
O prazo de vigência será de [número] meses.

CLÁUSULA TERCEIRA - DO VALOR
O valor total será de R$ [valor].

CLÁUSULA QUARTA - DAS OBRIGAÇÕES
As partes se comprometem a cumprir integralmente o acordado.

CLÁUSULA QUINTA - DA RESCISÃO
Poderá ser rescindido com [número] dias de notificação prévia.

CLÁUSULA SEXTA - DO FORO
Fica eleito o foro da comarca para dirimir dúvidas.

E, por estarem assim justos e contratados, firmam o presente instrumento.

[Local], [data].`
}

function generatePetition(context: string): string {
  return `EXCELENTÍSISSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO

[NOME COMPLETO], por seu advogado, vem propor

AÇÃO [TIPO DE AÇÃO]

em face de [RÉU], pelos fatos e fundamentos jurídicos a seguir:

I - DOS FATOS
${context}

II - DO DIREITO
A presente demanda encontra amparo legal em dispositivos do Código Civil e Constitucional.

III - DO PEDIDO
Requer-se a procedência dos pedidos com condenação do réu ao pagamento de custas e honorários.

Termos em que, pede deferimento.

[Local], [data].`
}

function generateContestation(context: string): string {
  return `EXCELENTÍSISSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO

[RÉU], já qualificado, vem, por seu advogado, apresentar

CONTESTAÇÃO

I - PRELIMINARES
[Questões preliminares se aplicável]

II - DO MÉRITO
${context}

A contestação encontra amparo legal em dispositivos processuais e materiais.

III - DOS PEDIDOS
Requer-se a improcedência total dos pedidos com condenação ao pagamento de custas.

Termos em que, pede deferimento.

[Local], [data].`
}

function generateReplica(context: string): string {
  return `TRÉPLICA

[AUTOR], em tréplica, expõe:

${context}

Reitera-se o pedido de procedência com condenação ao pagamento de custas e honorários.

[Local], [data].`
}
