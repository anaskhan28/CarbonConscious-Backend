import { z } from "zod";

export const AuthSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().min(1)

});

