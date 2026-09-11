export const problemMap = {
  ar_nao_gela: { label: 'Meu ar não está gelando', category: 'climatizacao', serviceType: 'Diagnóstico', equipment: 'Split' },
  ar_nao_liga: { label: 'Meu ar não liga', category: 'climatizacao', serviceType: 'Diagnóstico', equipment: 'Split' },
  ar_pingando: { label: 'Meu ar está pingando', category: 'climatizacao', serviceType: 'Manutenção corretiva', equipment: 'Split' },
  ar_barulho: { label: 'Meu ar está fazendo barulho', category: 'climatizacao', serviceType: 'Diagnóstico', equipment: 'Split' },
  instalar_ar: { label: 'Quero instalar um ar', category: 'climatizacao', serviceType: 'Instalação', equipment: 'Split' },
  limpar_ar: { label: 'Quero limpar meu ar', category: 'climatizacao', serviceType: 'Higienização', equipment: 'Split' },
  geladeira_freezer: { label: 'Minha geladeira ou freezer parou', category: 'residencial', serviceType: 'Diagnóstico', equipment: 'Geladeira' },
  outro: { label: 'Outro problema', category: 'climatizacao', serviceType: 'Diagnóstico', equipment: 'Outros' },
  ajuda: { label: 'Não sei — preciso de ajuda', category: 'climatizacao', serviceType: 'Diagnóstico', equipment: 'Outros' },
} as const;

export type ProblemKey = keyof typeof problemMap;

export function translateProblem(problem: ProblemKey, details: string | undefined, environment: string) {
  const selected = problemMap[problem];
  const description = `${selected.label}. Ambiente: ${environment}.${details?.trim() ? ` ${details.trim()}` : ''}`;
  return { ...selected, description };
}
