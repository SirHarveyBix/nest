init project :

- `yarn`
- launch : `yarn start`

# Premiers pas avec Nestjs

une app Nest a au moins un controller, et un module (les modules servent a "grouper" le code )

## Module
### Pipe
valide les données contenue dans la requete

### Controller
route de la requete vers une fonction

### Service
c'est une class qui execute la logique metier.
utilise des repositories pour recuperer, stocker des données.

### Repository
c'est une class qui accède a la base de donnée.
c'est souvent "TypeORM entity" (schema)

### nest cli
- `npm i -g @nestjs/cli`
  
creer le projet nest :

- `cd .. && nest new 01.messages`

creer des ficher nest via le terminal:

- module: `nest generate module messages`
- controller: `nest generate controller messages`
  - `nest generate controller messages/messages --flat`

---

## Dpendency injection

### Bad Practice

MessagesService créé sa propre copie de Message repository :

```js
export class MessagesService {
  messagesRepo: MessagesRepository

  constructor(){
    this.messagesRepo = new MessagesRepository()
  }
}
```

### Better Practice

MessagesService reçois ses dependences :

```js
export class MessagesService {
  messagesRepo: MessagesRepository

  constructor(repo: MessagesRepository ){
    this.messagesRepo = repo
  }
}
```

### Best Practice

MessagesService reçois ses dependence, et n'a pas besoin de MessagesRepository

```js

interface Repository {
  findOne(id: string)
  findAll()
  create(content: string)
}

export class MessagesService {
  messagesRepo: Repository

  constructor(repo: Repository ){
    this.messagesRepo = repo
  }
}
```
