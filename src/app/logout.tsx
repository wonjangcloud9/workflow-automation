"use client";

import { authClient } from "@/lib/atuh-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Logout = () => {
    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            }
        });
        
    }
    return (
        <Button onClick={handleLogout}>로그아웃</Button>
    )
}
