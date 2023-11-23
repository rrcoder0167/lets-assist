launch:
	npx prisma format
	npx prisma generate
	npx prisma db push
	npm run dev