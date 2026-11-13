import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../database/client.ts";
import { users } from "../database/schema.ts";
import { hash } from "argon2";

export const createUserRouter: FastifyPluginAsyncZod = async (server) => {
    server.post("/users", {
        schema: {
            tags: ["Auth"],
            summary: "Create User",
            body: z.object({
                name: z.string("O nome é obrigatório"),
                email: z.email("E-mail é obrigatório"),
                password: z.string("A senha é obrigatório"),
                whatsapp: z.string("O Wathsapp é obrigatório") 
            }),
            response: {
                201: z.object({ userId: z.uuid() }),
                400: z.object({ message: z.string() })
            }
        }
    }, async (request, reply) => {
        const body = request.body
        const { name, email, password, whatsapp } = body
        
        const result = await db.insert(users).values({
            name,
            email,
            password: await hash(password),
            whatsapp
        }).returning()

        return reply.status(201).send({ userId: result[0].id })
    })
}