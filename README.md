# Coffeepot

A demo app for [Remix](https://remix.run).

## Run locally

First you need to create a `.env` file at the project root:

```
cat > .env <<EOF
DATABASE_URL="file:./dev.db"
SESSION_SECRET=mysupersecretpassword
EOF
```

Then install dependencies:

```
npm install
```

And create and seed the database:

```
npm run db:reset
```

Finally, run the app:

```
npm run dev
```

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).
