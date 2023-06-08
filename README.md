# Backend
### How to install
In this project we use poetry as a package manager, to install this project you should
- Install Poetry
```
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```
Or Using Scoop
```
scoop install poetry
```

- Install all dependencies
```
poetry install
```

- Run Jupyter Notebook
```
poetry run jupyter notebook
```

# Frontend
### How to install
In this project we use svelte and tfjs, to install this project you should
- Install Node JS
```
windget install nodejs
```
Or using scoop
```
scoop install nodejs
```

- Install PNPM
```
npm install -g pnpm
```

- Install all dependencies
```
pnpm install
```

- Run svelte server
```
pnpm dev
```