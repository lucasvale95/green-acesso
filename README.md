<h1 align="center">
🏆 GREEN-ACESSO API
</h1>


## 🚀 Tecnologias
Projeto de teste back-end desenvolvido em NodeJS com TypeScript, Express, TypeORM e PostgresSQL.


## 💻 Projeto
Criar um endpoint que permita importar boletos do sistema financeiro em formato CSV e PDF, e assim manipular os documentos da forma correta.


## 🔰 Instalação

1. Clone o repositório:
```sh
git clone git@github.com:lucasvale95/green-acesso.git
```

2. Instale as dependências na pasta do projeto:
```sh
yarn install
```

3. Configure as variáveis de ambiente no arquivo .env:
```sh
POSTGRES_USER= 
POSTGRES_PWD= 
POSTGRES_DB= 
```

4. Rode as migrações:
```sh
yarn typeorm migration:run -d src/data-source.ts
```

5. Tudo pronto para rodar! Execute:
```sh
yarn dev
```

## ♟️ ROTAS

`GET /boletos`

Retorna os boletos com base nos filtros especificados.

Parâmetros de consulta (opcionais):

* `nome`: Filtra os boletos pelo nome do sacado.
* `valor_inicial`: Filtra os boletos pelo valor mínimo.
* `valor_final`: Filtra os boletos pelo valor máximo.
* `id_lote`: Filtra os boletos pelo ID do lote.
* `relatorio=1`: Gera uma resposta em Base64 com os boletos.

Exemplo de uso:
```bash
GET /boletos?nome=JOSE&valor_inicial=100&valor_final=200&id_lote=3
```

Exemplo de retorno:

```js
[
	{
		"id": 14,
		"nome_sacado": "JOSE DA SILVA",
		"valor": "182.54",
		"linha_digitavel": "123456123456123456",
		"ativo": true,
		"criado_em": "2023-07-14T14:00:17.202Z",
		"lote": {
			"id": 3,
			"nome": "JOSE DA SILVA",
			"ativo": true,
			"nome_lote": 17,
			"criado_em": "2023-07-14T14:00:17.177Z"
		}
	}
]
```



`POST /boletos`

Envia arquivos CSV contendo boletos para importação.

Corpo da requisição:
* Arquivo CSV contendo os boletos a serem importados.

Exemplo de retorno:

```js
{
	"message": "Boletos criados com sucesso"
}
```



`POST /boletospdf`

Envia arquivos PDF contendo boletos para importação.

Corpo da requisição:
* Arquivo PDF contendo os boletos a serem importados.

Exemplo de retorno:

```js
{
	"message": "Arquivo PDF processado com sucesso"
}
```
Obs: Arquivos ordenados e realocados em Desktop/Boletos-Green.



