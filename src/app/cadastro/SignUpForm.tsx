'use client';

import Link from 'next/link';
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

import { api } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const FormSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome deve ter pelo menos 3 caracteres.',
  }),
  email: z.string().email({
    message: 'Email Invalido',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter pelo menos 6 caracteres.',
  }),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    try {
      const user = { ...data, id: crypto.randomUUID(), role: 'admin' };
      api.post('/users', user);
    } catch (error) {
      console.log(error);
    }

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Cadastre-se</CardTitle>
        <CardDescription>
          Junte-se a nós! Cadastre-se para explorar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="signup-form">
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
          <Link href="/login">Conecte-se</Link>
        </Button>
        <Button type="submit" form="signup-form">
          Cadastre-se
        </Button>
      </CardFooter>
    </Card>
  );
}
