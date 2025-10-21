import prisma from "@/lib/db";

const Home = async () => {
  const users = await prisma.user.findMany();
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
}

export default Home;