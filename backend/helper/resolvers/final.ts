import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function saveToDB(resolverId: number, hash: string) {
    const assignment = await prisma.assignment.findUnique({
        where: {
            hash_reviewerId: { hash: hash, reviewerId: resolverId },
        },
    });
    if (assignment === null) {
        throw new Error("Assignment not found");
    }
    const final = await prisma.final.create({
        data: {
            ...assignment
        },
    })
    return final;
}