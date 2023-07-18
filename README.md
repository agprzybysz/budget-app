# Opis

W ramach Dare IT React Challenge została stworzona aplikacja budżetowa przy użyciu biblioteki React.

![app screenshot](/client/src/assets/app_screenshot.PNG)

### Umiejętności nabyte podczas tworzenia aplikacji

- tworzenie modułów, widoków przy użyciu biblioteki ReactJS
- zaprogramowanie kontrolek przygotowanych w Figmie w oparciu o framework MUI
- przygotowywanie i zaprogramowanie scenariuszy testowych w Cypress
- migracja wybranych modułów na język Typescript
- zarządzanie repozytorium projektu przy użyciu git-a

### Wykorzystane technologie

- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactj.dev/)
- [![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
- [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
- [![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)

# Pierwsze kroki

## 🧰 Instalacja pakietów NPM

znajdując się w katalogu głównym repozytorium react-challenge, uruchom terminal a następnie wywołaj następującą komendę

    npm i

✨ Terminal powinien wyglądać mniej więcej tak ✨

![Matrix terminal image](https://w0tt.files.wordpress.com/2011/06/matrix.gif?w=613&zoom=2)

a tak naprawdę tak

```
 adrianaolszak@Admins-MacBook-Pro > ~/WebstormProjects/non-work/dareit/react-challenge > npm i

> challenge@1.0.0 postinstall /Users/adrianaolszak/WebstormProjects/non-work/dareit/challenge
> run-p -l install:server install:client

[install:client]
[install:client] > challenge@1.0.0 install:client /Users/adrianaolszak/WebstormProjects/non-work/dareit/challenge
[install:client] > cd client && npm install
[install:client]
[install:server]
[install:server] > challenge@1.0.0 install:server /Users/adrianaolszak/WebstormProjects/non-work/dareit/challenge
[install:server] > cd server && npm install
[install:server]

```

⏳ instalacja może zająć trochę czasu ⏳

Zwróć uwagę na `[install:client]` oraz `[install:server]`, jednocześnie przebiega instalacja dla dwóch aplikacji - client, to tam będą wykonywane zadania oraz server, który będzie zasilał apkę front-endową danymi.

Jeżeli wszystko ukończyło się pomyślnie process w terminalu się zakończy.

Jeżeli coś będzie nie tak konsola na pewno poinformuje Cię o tym dużym błędem ;)

## 🏃 Uruchomienie aplikacji

### 🔗 Client i Server zawsze razem

Repozytorium jest skonstruowane w taki sposób aby aplikacja client oraz aplikacja server były uruchamiane jednocześnie. Jest to wymagane ponieważ jedno bez drugiego nie bedzie prawidłowo funkcjonować.

🔵 Pamiętaj aby zainstalować pakiety npm! Opisane w poprzednim kroku

Znajdująć się w katalogu głównym Twojego repozytorium uruchom terminal i wykonaj polecenie:

     npm run start

Komenda ta uruchomi 2 aplikacje które będą dostępne pod następującymi adresami:

- client - aplikacja reactowa - http://localhost:3000
- server - aplikacja backendowa - http://localhost:4320
  - dokumentacja API jest dostępna pod adresem http://localhost:4320/swagger

### Storybook

Storybook służy do pracy nad komponentami w izolacji. Jeżeli chcesz nanosić zmiany w wyglądzie lub funkcjonowaniu poszczególnych komponentów muszisz edytować odpowiadajce im pliki w katalogu `client/src/ui`.

Aby uruchomić storybook należy wywołać następującą komendę znajdując się w katalogu głównym Twojego repozytorium:

```bash
npm run storybook
```

Komenda ta uruchomi aplikację Storybook, która będzie dostępna pod adresem http://localhost:6006

## 🏃 Uruchomienie testów automatycznych

Projekt zawiera wachlarz testów automatycznych.

Aby uruchomić testy należy, uruchomić clienta i serwer (może być to ten sam proces który został uruchomiony w poprzednim zadaniu) tak jak do tej pory uruchomić komendę z poziomu katalogu głównego:

    npm run cypress:open

To polecenie uruchomi panel Cypress, w którym możesz uruchomić wszystkie lub wybrane testy.

# FAQ

## Jak dodać nowy pakiet npm?

Uruchom terminal, przejdź do katalogu `/client` oraz wpisz polecenie `npm i :nazwa-pakietu`

<!-- MARKDOWN LINKS & IMAGES -->
