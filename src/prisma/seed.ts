import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create 3 users with posts
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  await prisma.user.create({
    data: {
      username: "alice",
      email: "alice@example.com",
      password: "password123",
      post: {
        create: [
          { content: "Alice’s first post", img: "https://picsum.photos/200" },
          { content: "Alice’s second post", img: "https://picsum.photos/200" },
          { content: "Alice’s third post", img: "https://picsum.photos/200" },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "bob",
      email: "bob@example.com",
      password: "password123",
      post: {
        create: [
          { content: "Bob’s first post", img: "https://picsum.photos/200" },
          { content: "Bob’s second post", img: "https://picsum.photos/200" },
          { content: "Bob’s third post", img: "https://picsum.photos/200" },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "charlie",
      email: "charlie@example.com",
      password: "password123",
      post: {
        create: [
          { content: "Charlie’s first post", img: "https://picsum.photos/200" },
          {
            content: "Charlie’s second post",
            img: "https://picsum.photos/200",
          },
          { content: "Charlie’s third post", img: "https://picsum.photos/200" },
        ],
      },
    },
  });

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
