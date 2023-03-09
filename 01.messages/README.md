init project :

- `yarn`
- launch : `yarn start`

# Premiers pas avec Nestjs

une app Nest a au moins un controller, et un module (les modules servent a "grouper" le code )

## Module
### Pipe
valide les données contenue dans la requete

### Controller
"Route" la requete vers une fonction particuliere

### Service
execute la logique metier

### Repository
accède a la base de donnée

### nest cli
- `npm i -g @nestjs/cli`
  
creer le projet nest :

- `cd .. && nest new 01.messages`

creer des ficher nest via le terminal:

- module: `nest generate module messages`
- controller: `nest generate controller messages`
  - `nest generate controller messages/messages --flat`
