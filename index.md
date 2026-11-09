<img src="doc/landing.png" alt="Screenshot of the Digits landing page">

# Digits

Digits is a web app for adding, viewing, and editing contacts and keeping notes about them.

## Installation

1. Clone this repository and open the `digits` folder in VS Code.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start PostgreSQL and create the `digits` database:

   ```bash
   createdb digits
   ```

4. If you do not already have an `.env` file, copy `sample.env`:

   ```bash
   cp sample.env .env
   ```

   Set `DATABASE_URL` in `.env` to use your local PostgreSQL credentials and the `digits` database. Keep `.env` out of Git.

5. Apply the migrations, generate the Prisma Client, and load the sample data:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   npx prisma db seed
   ```

6. Start the application:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Walkthrough

### Landing Page

The landing page introduces Digits. Select **Sign In** to access the contact manager.

### Sign In

After seeding your local database, sign in as `john@foo.com`. If you kept the default demo password, use `changeme`.

### Add Contact

Select **Add Contact** and enter the contact’s first name, last name, address, image URL, and description. Submit the form to save the contact.

### List Contacts

Select **List Contacts** to see the contacts associated with your account. Each contact card shows the contact’s name, photo, address, and description.

### Edit Contact

Select **Edit** on a contact card to update its information. Save your changes and return to **List Contacts** to see the updated card.

### Add Contact Notes

Open **List Contacts** and find the contact you want to write a note about. Enter your note in the form on the contact’s card and submit it. The saved note appears on that same card.