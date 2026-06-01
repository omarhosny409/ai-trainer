import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  console.log("Seed جاهز. المستخدمون ينشأون عبر Clerk عند أول طلب API.");
}
main().finally(() => prisma.$disconnect());
