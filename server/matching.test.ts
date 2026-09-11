import { describe, expect, it } from 'vitest';
import { scoreProfessional } from './matching';

describe('matching domain service', () => {
  const request = { category: 'climatizacao', serviceType: 'Diagnóstico', city: 'Cabo Frio', availability: 'Tarde' };

  it('matches a professional in the same city with a compatible specialty', () => {
    const result = scoreProfessional(request, { cities: 'Cabo Frio, Arraial do Cabo', specialties: 'climatizacao, comercial', availability: 'Seg a Sex' });
    expect(result.eligible).toBe(true);
    expect(result.score).toBe(100);
    expect(result.reason).toContain('Atende sua cidade');
  });

  it('does not match a professional outside the covered region', () => {
    const result = scoreProfessional(request, { cities: 'Niterói', specialties: 'climatizacao', availability: 'Seg a Sex' });
    expect(result.eligible).toBe(false);
    expect(result.score).toBe(40);
  });
});
