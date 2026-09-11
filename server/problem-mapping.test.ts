import { describe, expect, it } from 'vitest';
import { translateProblem } from './problem-mapping';

describe('customer problem translation', () => {
  it('translates a human symptom without requiring technical fields', () => {
    const result = translateProblem('ar_nao_gela', 'Começou ontem.', 'Casa');
    expect(result.category).toBe('climatizacao');
    expect(result.serviceType).toBe('Diagnóstico');
    expect(result.description).toBe('Meu ar não está gelando. Ambiente: Casa. Começou ontem.');
  });

  it('keeps an unsure customer inside the matching flow', () => {
    const result = translateProblem('ajuda', undefined, 'Empresa');
    expect(result.equipment).toBe('Outros');
    expect(result.description).toContain('Ambiente: Empresa');
  });
});
