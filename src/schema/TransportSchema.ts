import { z } from "zod";

export const TransportSchema = z.object({
   mode: z.string().min(1).max(100),
    duration: z.number().min(1).max(10000),
    distance: z.number().min(1).max(10000),
    carbonEmission: z.number().min(0).max(10000),
    userId: z.string().min(1),

});

