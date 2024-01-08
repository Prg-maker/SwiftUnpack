import Fastify from 'fastify'
import {Decompress} from './Routes/decompress_tar'

const app = Fastify()


app.register(require('@fastify/multipart'), {
    limits:{

    }
})


app.register(Decompress)


app.listen({
    port:3333,
},
    (adress, error)=>{
        console.log("server")
    }
)