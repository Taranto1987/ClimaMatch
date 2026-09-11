export type WhatsAppResult = { sent: boolean; reason?: string };

export function normalizeWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('55') ? digits : `55${digits}`;
}

export function buildWhatsAppMessage(problem: string, city: string) {
  return `ClimaMatch: novo chamado compatível em ${city}. ${problem} Acesse seu painel para ver os detalhes e demonstrar interesse.`;
}

export async function sendWhatsAppNotification(phone: string | null | undefined, message: string): Promise<WhatsAppResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!phone || !token || !phoneNumberId) return { sent: false, reason: 'whatsapp_not_configured' };
  const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to: normalizeWhatsAppNumber(phone), type: 'text', text: { preview_url: false, body: message } }),
  });
  if (!response.ok) return { sent: false, reason: `provider_${response.status}` };
  return { sent: true };
}
