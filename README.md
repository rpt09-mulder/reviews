# PostGreSQL setup 

## Installing postGreSQL
In terminal:

Install PostgreSQL: brew install postgresql .  
Start PostgresSQL: brew services start postgresql  
Create database: createdb <db_name>

## Run seed file
```node ./dummydata/seed.js``` 
or add line to package.json scripts:  
``` "seed-database": "node ./dummydata/seed.js"``` . 

# Adding env file
1. install dotenv npm package ```npm install dotenv```
2. create .env file in root directory of service .  
3. Add any env variable name desired; ex: ```DB_FOO=bar``` and ```PORT=3000``` . 
4. When using .env variable in module, ``require('dotenv').config();``` . 

# PostGreSQL
synyax differences from MySQL:
1. Instead of ``` ID auto_increment ```, use ``` ID serial primary key ``` . 
2. Instead of ``` create database <db_name> ```, use ``` create schema <schema_name> ```


# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

