'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const SignInSchema = z.object({
  email: z.string().email({
    message: 'Email Invalido',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter pelo menos 6 caracteres.',
  }),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit({ email, password }: z.infer<typeof SignInSchema>) {
    console.log(email, password);
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      console.log('[LOGIN_RESPONSE]: ', response);

      if (!response?.error) {
        router.refresh();
        router.push('/');
      } else {
        toast({
          description: (
            <p className="text-white font-semibold">Email ou senha invalidos</p>
          ),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log('Login Error:', error);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Entre agora para se conectar.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="signup-form">
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="link" className="pl-1 text-violet-800 " asChild>
          <Link href="/cadastro">Cadastre-se</Link>
        </Button>
        <Button type="submit" form="signup-form">
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
}
