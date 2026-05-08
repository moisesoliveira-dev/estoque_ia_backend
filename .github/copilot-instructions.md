# Instrucoes para IA deste Repositorio

## Objetivo
Este repositorio e um template backend NestJS virgem.
Nao assuma tecnologia de banco, cache, fila, auth, billing ou AI.
So implemente essas escolhas quando o usuario pedir explicitamente.

## Estrutura Base
- Estrutura esperada:
```text
src/
	config/
	common/
	modules/
	shared/
	database/   (opcional)
test/
```

- src/config: configuracoes opcionais e evolutivas.
- src/common: componentes reutilizaveis e sem regra de negocio.
- src/modules: features de dominio (somente quando solicitadas).
- src/shared: tipos, interfaces e enums compartilhados.
- src/database: opcional; usar apenas quando houver decisao de persistencia.
- test: testes unitarios e e2e.

## Regras de Template
- Manter o projeto generico por padrao.
- Evitar dependencias e integracoes nao solicitadas.
- Manter docker-compose e .env.example opcionais e neutros.
- Preservar pastas vazias com .gitkeep.

## Comportamento em Nova Sessao
- Ler este arquivo antes de propor arquitetura.
- Perguntar ou inferir o minimo necessario antes de escolher stack.
- Fazer alteracoes pequenas, objetivas e rastreaveis.
- Nao adicionar contexto historico longo nas respostas.
