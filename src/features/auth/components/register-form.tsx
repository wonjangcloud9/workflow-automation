"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/atuh-client";


const registerSchema = z.object({
    email: z.email("유효한 이메일을 입력해주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요."),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const router = useRouter();
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        await authClient.signUp.email({
            name: values.email,
            email: values.email,
            password: values.password,
            callbackURL: "/",
        },
        {
            onSuccess: () => {
                toast.success("회원가입이 완료되었습니다.");
                router.push("/login");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            },
        }
    );
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>시작하기</CardTitle>
                    <CardDescription>
                        이메일과 비밀번호를 입력하여 계정을 생성해주세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                                        Sign up with Google
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                                        Sign up with Kakao
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                                        Sign up with Naver
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" placeholder="name@example.com" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Create password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="********" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="********" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        {isPending ? "회원가입 중..." : "회원가입"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    이미 계정이 있으신가요?{" "}
                                    <Link href="/login" className="underline underline-offset-4">로그인</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}