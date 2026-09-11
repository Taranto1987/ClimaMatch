export type MatchingRequest = { category: string; serviceType: string; city: string; availability: string };
export type MatchingProfessional = { cities: string; specialties: string; availability: string };
export type MatchingResult = { score: number; eligible: boolean; reason: string };

/** MVP matching: transparent, deterministic, and intentionally simple. */
export function scoreProfessional(request: MatchingRequest, professional: MatchingProfessional): MatchingResult {
  const sameCity = professional.cities.toLowerCase().includes(request.city.toLowerCase());
  const sameSpecialty = professional.specialties.toLowerCase().includes(request.category.toLowerCase()) || professional.specialties.toLowerCase().includes(request.serviceType.toLowerCase());
  const available = Boolean(professional.availability.trim());
  const score = (sameCity ? 60 : 0) + (sameSpecialty ? 35 : 0) + (available ? 5 : 0);
  const reasons = [sameCity ? 'Atende sua cidade' : 'Atende a região', sameSpecialty ? 'Especialidade compatível' : 'Categoria próxima', available ? 'Disponibilidade informada' : 'Disponibilidade pendente'];
  return { score, eligible: score >= 60, reason: reasons.join(' · ') };
}
