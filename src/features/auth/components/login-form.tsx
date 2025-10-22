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


const loginSchema = z.object({
    email: z.email("유효한 이메일을 입력해주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/",
        },
        {
            onSuccess: () => {
                toast.success("로그인이 완료되었습니다.");
                router.push("/");
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
                    <CardTitle>환영합니다</CardTitle>
                    <CardDescription>
                        이메일과 비밀번호를 입력하여 로그인해주세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                                        Continue with Google
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                                        Continue with Kakao
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                                        Continue with Naver
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="********" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        {isPending ? "로그인 중..." : "로그인"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    계정이 없나요?{" "}
                                    <Link href="/signup" className="underline underline-offset-4">회원가입</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}