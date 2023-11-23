launch:
	npx prisma format
	npx prisma generate
	npx prisma db push
	npm run dev

db:
	npx prisma format
	npx prisma generate
	npx prisma db push
