
const { config } = require('dotenv');
if (process.env.NODE_ENV === 'production') config({ path: 'config/.env.prod' });
else config({ path: 'config/.env.dev' });



const Hapi = require('hapi');
const classificador = require('./classificador');
//const classificador = new classi();
const Joi = require('joi');

const Vision = require('vision');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');

//const classificador = new Database();

/*const USUARIO_VALIDO = {
    username: 'Rodrigo',
    password: '123',
};*/
const SECRET_KEY = process.env.SECRET_KEY;
const ID_TOKEN = process.env.ID_TOKEN;
const HapiJwt = require('hapi-auth-jwt2');
const Jwt = require('jsonwebtoken');

//inicializamos o nosso servidor WEB
const app = new Hapi.Server();
//definimos a porta
app.connection({ port: process.env.PORT });

async function registrarRotas() {
    try {
        app.route([
            // ==========================================RELATORIO========================================
            {
                path: '/classificador/{altura}/{pe}/{peso}',
                method: 'GET',
                config: {
                    auth: false,
                    description: 'Rota para pesquisar uma probabilidade de sexo da pessoa',
                    notes: 'Pesquisar um funcionário por id',
                    tags: ['api'],
                    validate: {
                        params: {
                            altura: Joi.string().required(),
                            pe: Joi.string().required(),
                            peso: Joi.string().required(),
                        },
                        /*headers: Joi.object({
                            authorization: Joi.string().required(),
                        }).unknown(),*/
                    },
                    handler: async (req, reply) => {
                        try {
                            const altura = req.params.altura;
                            const pe = req.params.pe;
                            const peso = req.params.peso;
                            const result = await classificador(altura,pe,peso);
                            return reply(result);
                        } catch (e) {
                            console.log('deu ruim', e);
                            return reply('DEU RUIM');
                        }
                    }
                },
            },
            // =========================================== USERS ==========================================
        ]);
    } catch (e) {
        console.error('DEU RUIM', e);
    }
}

app.register([
    //registramos o plugin de auth
    HapiJwt,
    //Registramos os plugins para trabalhar com o SWAGGER
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: { info: { title: 'API - Classificador ML', version: '1.0' } }
    }])
    .then(_ => {
        // configuramos a estratégia de autenticação
        //passamos um nome que será usado em cada rota
        //e no objeto validate, validamos se o token é valido
        app.auth.strategy('jwt', 'jwt', {
            secret: SECRET_KEY,
            verifyFunc: (decoded, request, callback) => {
                if (decoded.idToken !== ID_TOKEN) return callback(null, false);
                //ESSE MÉTODO É INVOCADO CADA VEZ QUE USAR O TOKEN
                // E NO OBJETO VALIDATE, VALIDAMOS SE O TOKEN É VALIDO
                return callback(null, true);
            },
            //ALGORITMO DE AUTENTICAÇÃO HASH
            verifyOptions: { algorithms: ['HS256'] }
        });
        //setamos o jwt como default obrigatório
        app.auth.default('jwt');
    }).then(registrarRotas).then(_ => {
        app.start(() => console.log(`Servidor rodando na porta ${process.env.PORT}`));
    });

//para definir o endereço que o cliente vai trabalhar com a sua api 
//definimos as rotas
