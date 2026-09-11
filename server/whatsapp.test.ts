import { describe, expect, it } from 'vitest';
import { buildWhatsAppMessage, normalizeWhatsAppNumber } from './whatsapp';

describe('WhatsApp notification adapter', () => {
  it('normalizes Brazilian phone numbers', () => {
    expect(normalizeWhatsAppNumber('(22) 99999-0000')).toBe('5522999990000');
    expect(normalizeWhatsAppNumber('5522999990000')).toBe('5522999990000');
  });

  it('builds an actionable match message', () => {
    expect(buildWhatsAppMessage('Meu ar não está gelando', 'Cabo Frio')).toContain('Cabo Frio');
    expect(buildWhatsAppMessage('Meu ar não está gelando', 'Cabo Frio')).toContain('painel');
  });
});
