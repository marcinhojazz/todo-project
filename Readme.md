# Todo List Application

## Descrição
Esta aplicação é uma lista de tarefas desenvolvida usando as seguintes tecnologias:

**Backend:**
- Flask
- Flask-SQLAlchemy
- Flask-RESTful

**Frontend:**
- Vite
- React
- Tailwind CSS
- Axios

## Estrutura do Projeto
```sh
todo_project/
├── backend-todo/
│ ├── app.py
│ ├── db.py
│ ├── models.py
│ ├── resources.py
│ ├── tasks.db
│ └── requirements.txt
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── TaskList.jsx
│ │ ├── Button.jsx
│ │ └── ...
│ ├── public/
│ ├── package.json
│ └── ...
└── README.md
```

## Configuração e Execução

### Backend

1. Clone o repositório:

```sh
  git clone https://github.com/marcinhojazz/todo-project
  cd todo-project/backend-todo
```

2. Crie um ambiente virtual e instale as dependências:

```sh
python -m venv venv

source venv/bin/activate #No windows use `./venv/Scripts/activate`

pip install -r requirements.txt
```

3. Inicie o servidor Flask:

`flask run`

---

### Frontend

1. Vá para o diretório do frontend:

```sh
cd ..
cd frontend-todo
```

2. Instale as dependências

`npm install`

ou com yarn:

`yarn`

3. Inicie o servidor de desenvolvimento

`npm run dev`

com yarn:

`yarn dev`

4. Acesse a aplicação em `http://localhost:3000`

---

## Endpoints da API

### Listar todas as tarefas
**GET** `/tasks`

#### Exemplo de resposta
```json
[
  {
    "id": 1,
    "title": "Task 1",
    "completed": false
  },
  {
    "id": 2,
    "title": "Task 2",
    "completed": true
  }
]
```

### Adicionar uma nova tarefa
**POST** `/tasks`

#### Parâmetros
```json
{
  "title": "Nova Tarefa",
  "completed": false
}
```

#### Exemplo de resposta
```json
{
  "id": 3,
  "title": "Nova Tarefa",
  "completed": false
}
```

### Marcar uma tarefa como completa
**PUT** `/tasks/<int:task_id>`

#### Parâmetros
```json
{
  "title": "Tarefa Atualizada",
  "completed": true
}
```

#### Exemplo de resposta
```json
{
  "id": 3,
  "title": "Tarefa Atualizada",
  "completed": true
}
```

### Remover uma tarefa
**DELETE** `/tasks/<int:task_id>`

#### Exemplo de resposta
```json
204 No Content
```

## Melhorias Futuras
- Adicionar autenticação de usuário.
- Implementar testes unitários para o backend e frontend.
- Melhorar a interface do usuário com animações e feedback visual.

## Contribuição
Se você deseja contribuir para este projeto, por favor faça um fork do repositório e envie um pull request com suas alterações.

## Licença
Este projeto está licenciado sob a licença MIT.
