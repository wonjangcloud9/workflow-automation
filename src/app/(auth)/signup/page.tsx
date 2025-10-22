import { RegisterForm } from "@/features/auth/components/register-form";
import { requireGuest } from "@/lib/auth-utils";

const Page = async () => {
    await requireGuest();
    return (
        <div>
            <RegisterForm />
        </div>
    )
}

export default Page;