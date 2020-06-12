/**
 * Criar uma endpoint para users:
 * Listar usuários(GET)
 * Criar usuários(POST)
 * Modificar usuários(PUT)
 * Remover usuários(DELETE)
 */ 

//fs - para lidar com arquivos de sistema
const fs = require('fs')//importando ele

const {join} = require('path')//modulo para lidar com caminhos de diretorios

const filePath = join(__dirname, 'users.json') //caminho

//para buscar os usuario do arquivo. simular o acesso ao banco
const getUsers = () => {
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

    try {
        return JSON.parse(data)
    }catch(error) {
        return[]
    }
}

//para poder salvar os usuário
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))//essa função vai receber os dados do usuário(users). E transformando o obj em json

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers() //buscar usuários

            res.send({users})
        })
        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)
            saveUser(users)

            res.status(201).send('OK')

        })
        .put((req, res) => {
            const users = getUsers()

            saveUser(users.map(user => {  //map - criar um objeto atualizando o usuário, passando o id
                if(user.id === req.params.id){
                    return {
                        ...user,
                        ...req.body
                    }
                }

                return user
            }))

            res.status(200).send('OK')
        })
        .delete((req, res) => {
            const user = getUsers()

            saveUser(user.filter(user => user.id !== req.params.id))//filtrar o usuario que for diferente do id que estamos passando. 

            res.status(200).send('OK')
        })

        
}

module.exports = userRoute//fazer a exportação desse modulo que que possa ser usado externamente