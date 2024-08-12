import {z}from'zod'

export const createSchema=z.object({
    id:z.string(),
    name:z.string(),
    email:z.string(),
}).required()
export type CreateZodDto=z.infer<typeof createSchema>