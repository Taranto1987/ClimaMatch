# WhatsApp em standby

## Decisão

A integração de WhatsApp foi deliberadamente colocada em **standby**. O ClimaMatch não dependerá de WhatsApp para criar chamados, realizar matching ou notificar profissionais dentro do sistema.

## Estado atual

O sistema continua funcionando com notificações internas no painel do profissional. O adaptador técnico de WhatsApp permanece isolado no servidor, mas não será considerado requisito de publicação enquanto o provedor, o número oficial e o modelo operacional não forem definidos.

Quando não existem credenciais configuradas, o adaptador retorna `whatsapp_not_configured` e o fluxo principal segue normalmente. Falhas de provedor também não bloqueiam a criação do chamado nem a notificação interna.

## O que falta decidir antes de ativar

1. Escolher o provedor: Meta WhatsApp Cloud API, BSP ou outro serviço oficial.
2. Definir o número oficial do ClimaMatch e o responsável pela conta empresarial.
3. Definir se serão usadas mensagens livres dentro da janela de atendimento ou templates aprovados.
4. Definir opt-in, política de privacidade, limites de envio e tratamento de descadastro.
5. Configurar os segredos do servidor e testar em ambiente controlado antes da publicação.

## Próxima ativação técnica

A ativação futura deverá configurar `WHATSAPP_ACCESS_TOKEN` e `WHATSAPP_PHONE_NUMBER_ID` como segredos do servidor, validar números brasileiros, testar uma mensagem de chamado compatível e observar erros sem remover o fallback interno.

Até essa decisão, a etapa de WhatsApp permanece explicitamente pendente e não bloqueia o produto.
