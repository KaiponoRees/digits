import { PrismaClient } from '@prisma/client';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  for (const [index, contact] of config.defaultContacts.entries()) {
    await prisma.contact.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
    });

    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
