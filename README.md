# Countries
## Descrição
O projeto "Countries" é uma aplicação web desenvolvida com React e Vite que exibe informações sobre países ao redor do mundo. O aplicativo permite aos usuários procurar países, filtrar por região e visualizar detalhes específicos de cada país, incluindo bandeira, população, região, capital, e países vizinhos.

## Funcionalidades
- Tela Inicial:
  - Exibe uma grade de países com suas bandeiras e informações básicas.
  - Barra de pesquisa para buscar países por nome.
  - Filtro por região para refinar a lista de países.

- Página de Detalhes do País:
  - Mostra informações detalhadas sobre o país selecionado, incluindo bandeira, nome nativo, população, região, sub-região, capital, domínio de topo, moedas, e idiomas.
  - Exibe países vizinhos com links para suas respectivas páginas de detalhes.
    
- Responsividade:
  - Adaptado para funcionar bem em diferentes tamanhos de tela, incluindo dispositivos móveis e tablets.

## Tecnologias Utilizadas

- Frontend:
  - React
  - Vite
  - Axios (para chamadas API)
  - CSS (para estilos)
    
- API:
  - REST Countries (para obter dados dos países)

## Instalação
1. Clone o repositório:
    - git clone https://github.com/Lafaietepedro/Countries.git  
    - cd Countries

2. Instale as dependências:
    - npm install

3. Inicie o servidor de desenvolvimento:
    - npm run dev

4.Abra o navegador e acesse http://localhost:3000 para ver a aplicação em execução.

##Estrutura do Projeto
- src/: Contém o código-fonte da aplicação.
  - components/: Componentes React reutilizáveis.
    - Navbar.jsx: Componente de navegação.
    - Home.jsx: Tela inicial com a grade de países e barra de pesquisa.
    - Country.jsx: Página de detalhes do país.
  - App.jsx: Configuração das rotas e estrutura principal da aplicação.
  - index.jsx: Ponto de entrada da aplicação.
- public/: Contém arquivos estáticos e o HTML principal da aplicação.
- styles/: Contém arquivos CSS para estilizar a aplicação.

## Contribuição
Se você deseja contribuir para o projeto, siga estes passos:

1. Faça um Fork do repositório.
2. Crie uma nova branch:
- git checkout -b minha-nova-feature
3. Faça suas alterações e commit:
- git add .  
- git commit -m "Descrição das alterações"
4. Envie para o repositório remoto:
- git push origin minha-nova-feature
5. Abra um Pull Request no GitHub.

## Licença
Este projeto está licenciado sob a Licença MIT.

## Contato
Se você tiver perguntas ou precisar de mais informações, sinta-se à vontade para entrar em contato:
- Autor: Lafaiete Pedro
- Email: lafaietepedro3@gmail.com

  ---

# Countries
## Description
The "Countries" project is a web application developed with React and Vite that displays information about countries around the world. The app allows users to search for countries, filter by region, and view detailed information about each country, including its flag, population, region, capital, and neighboring countries.

## Features
- Home Screen:
  - Displays a grid of countries with their flags and basic information.
  - Search bar to find countries by name.
  - Region filter to refine the list of countries.

- Country Details Page:
  - Shows detailed information about the selected country, including flag, native name, population, region, sub-region, capital, top-level domain, currencies, and languages.
  - Displays neighboring countries with links to their respective detail pages.

- Responsiveness:
  - Adapted to work well on various screen sizes, including mobile devices and tablets.

## Technologies Used
- Frontend:
  - React
  - Vite
  - Axios (for API calls)
  - CSS (for styling)

- API:
  - REST Countries (for fetching country data)

## Installation
1. Clone the repository:
    - git clone https://github.com/Lafaietepedro/Countries.git  
    - cd Countries

2. Install the dependencies:
    - npm install

3. Start the development server:
    - npm run dev

4. Open your browser and go to http://localhost:3000 to view the application in action.

## Project Structure
- src/: Contains the source code of the application.
  - components/: Reusable React components.
    - Navbar.jsx: Navigation component.
    - Home.jsx: Home screen with the country grid and search bar.
    - Country.jsx: Country details page.
  - App.jsx: Sets up routing and the main structure of the application.
  - index.jsx: Entry point of the application.
- public/: Contains static files and the main HTML of the application.
- styles/: Contains CSS files for styling the application.

## Contributing
If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
    - git checkout -b my-new-feature
3.Make your changes and commit:
    - git add .  
    - git commit -m "Description of changes"
4. Push to the remote repository:
    - git push origin my-new-feature
5. Open a Pull Request on GitHub.

##License
This project is licensed under the MIT License.

## Contact
If you have any questions or need further information, feel free to reach out:
- Author: Lafaiete Pedro
- Email: lafaietepedro3@gmail.com
