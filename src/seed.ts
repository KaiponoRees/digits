import { prisma } from './lib/prisma';
import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  for (const account of config.defaultAccounts) {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }

  await Promise.all(
    config.defaultContacts.map(async (contact, index) => {
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
    }),
  );

  config.defaultContacts.forEach((contact) => {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
