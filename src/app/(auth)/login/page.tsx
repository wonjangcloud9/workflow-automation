import { LoginForm } from "@/features/auth/components/login-form";
import { requireGuest } from "@/lib/auth-utils";

const Page = async () => {
  await requireGuest();
  
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Page;