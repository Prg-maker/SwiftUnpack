import {FastifyInstance} from "fastify";
import '@fastify/multipart'
import path from 'path'
import fs, { write } from 'fs'


export async function Decompress(app:FastifyInstance){
    app.get("/", (request , reply)=> {
        return {
            Hello: "Hello world"
        }
    })

    app.post("/upload" ,async (req ,reply) => {
        const file =await req.file()
        const uploadsPath = "./temp"

        try{
            const filePath = path.join(uploadsPath, `${file?.filename}`)
            const writeStream = fs.createWriteStream(filePath)
    
            await new Promise((resolve , reject) => {
                file?.file.pipe(writeStream)
                file?.file.on('end' , resolve)
                writeStream.on('error', reject)
            })
            console.log(`Arquivo ${file?.filename} carregado com sucesso.`);
            reply.code(200).send('Arquivo carregado com sucesso.');
        }catch(err){
            console.error('Erro ao processar a solicitação de upload:', err);
            reply.code(500).send('Erro ao processar a solicitação de upload');
        }
    })
}
