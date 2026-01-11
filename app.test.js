//Importado de bibliotecas
const request = require("supertest");
const app = require("./app");

//Tests unitarios para usuarios 
describe('users', () => {

    //Variables necesarias
    var token = ""
    var id = ""
    var testEmail = ""

    //POST (Register)
    it('should register a user', async () => {
        const timestamp = Date.now() // Genera un timestamp
        testEmail = `test${timestamp}@test.com`
        const response = await request(app)
            .post('/api/v1/user/register')
            .send({
                username: `test${timestamp}`, // Utiliza el timestamp para crear un nombre de usuario único
                fullName: `test${timestamp}`,
                description: 'test description',
                email: testEmail,
                password: 'test'
            })
            .set('Accept', 'application/json')
            .expect(200)
        console.log('========== RESPUESTA COMPLETA ==========')
        console.log(JSON.stringify(response.body, null, 2))
        console.log('========================================')
        expect(response.body.data.user.username).toEqual(`test${timestamp}`)
        expect(response.body.data.user.fullName).toEqual(`test${timestamp}`)
        expect(response.body.data.user.description).toEqual('test description')
        expect(response.body.data.user.email).toEqual(testEmail)
        expect(response.body.data.user.password).not.toBeDefined() // No se debe devolver la contraseña aunque este hasheada
        expect(response.body.data.token).toBeDefined()
        expect(response.body.data.user._id).toBeDefined()
        token = response.body.data.token
        id = response.body.data.user._id
    })
    //LOGIN
    it('should login a user', async () => {
        const timestamp = Date.now() // Genera un timestamp
        const response = await request(app)
            .post('/api/v1/user/login')
            .send({
                email: testEmail,
                password: 'test'
            })
            .set('Accept', 'application/json')
            .expect(200)
        console.log('========== RESPUESTA COMPLETA ==========')
        console.log(JSON.stringify(response.body, null, 2))
        console.log('========================================')
        expect(response.body.data.user.email).toEqual(testEmail)
        expect(response.body.data.user.password).not.toBeDefined() // No se debe devolver la contraseña aunque este hasheada
        expect(response.body.data.token).toBeDefined()
        expect(response.body.data.user._id).toBeDefined()
        token = response.body.data.token
        id = response.body.data.user._id
    })
    //GET ALL USERS 
    it('should get all users', async () => {
        const response = await request(app)
            .get('/api/v1/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        console.log('========== RESPUESTA COMPLETA ==========')
        console.log(JSON.stringify(response.body, null, 2))
        console.log('========================================')
        expect(response.body.data).toBeDefined()
        expect(Array.isArray(response.body.data)).toBeTruthy()
        expect(response.body.data.length).toBeGreaterThan(0)
    })
    //GET USER BY ID
    it('should get a user by id', async () => {
        const response = await request(app)
            .get(`/api/v1/user/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        console.log('========== RESPUESTA COMPLETA ==========')
        console.log(JSON.stringify(response.body, null, 2))
        console.log('========================================')
        expect(response.body.data).toBeDefined()
        expect(response.body.data._id).toEqual(id)
    })
    // POST NEW USER 
    it('should create a new user', async () => {
        const timestamp = Date.now() // Genera un timestamp
        const response = await request(app)
            .post('/api/v1/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: `NewUser${timestamp}`, // Utiliza el timestamp para crear un nombre de usuario único
                fullName: `NewUser${timestamp}`,
                description: 'testing',
                email: `NewUser${timestamp}@test.com`,
                password: 'testing'
            })
            .expect(200)
        console.log('========== RESPUESTA COMPLETA ==========')
        console.log(JSON.stringify(response.body, null, 2))
        console.log('========================================')
        expect(response.body.data).toBeDefined()
        expect(response.body.data._id).toBeDefined()
        expect(response.body.data.username).toEqual(`NewUser${timestamp}`)
    })
    //PUT USER BY ID
    it('should update a user by id', async () => {
        const timestamp = Date.now() // Genera un timestamp
        const response = await request(app)
            .put(`/api/v1/user/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: `updatedUser${timestamp}`, // Utiliza el timestamp para crear un nombre de usuario único
                fullName: `updatedUser${timestamp}`,
                description: 'upadated user description',
                email: `updatedUser${timestamp}@test.com`,
                password: 'updatedUser123'
            })
            .expect(200)
        console.log('========== RESPUESTA COMPLETA ==========')
        console.log(JSON.stringify(response.body, null, 2))
        console.log('========================================')
        expect(response.body.data).toBeDefined()
        expect(response.body.data._id).toEqual(id)
        expect(response.body.data.username).toEqual(`updatedUser${timestamp}`)
    })
    //DELETE USER BY ID
    it('should delete a user by id', async () => {
        const response = await request(app)
            .delete(`/api/v1/user/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        console.log('========== RESPUESTA COMPLETA ==========')
        console.log(JSON.stringify(response.body, null, 2))
        console.log('========================================')
        expect(response.body.data).toBeDefined()
        expect(response.body.data._id).toEqual(id)
    })


})
