'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { SignOutButton } from '@/components/SignOutButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { api } from '@/services/api';
import { User } from '@/types/interfaces';

export default function Home() {
  const { data: session } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const getUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  async function handleDeleteUser(userId: string) {
    try {
      await api.delete(`/users/${userId}`);

      setUsers(users.filter((item) => item.id !== userId));
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function handleEditUser(userId: string) {
    users.map(async (user) => {
      if (user.id === userId) {
        try {
          if (name === '' || email === '') throw Error;

          await api.put(`/users/${userId}`, { ...user, name, email });
        } catch (error) {
          console.log('Error:', error);
        }
      }
    });

    getUsers();
  }

  return (
    <div className="h-screen w-full bg-zinc-100 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Bem vindo {session?.user?.name}.</h1>
      <h2 className="text-2xl font-semibold">Contas cadastradas</h2>
      <table className="table-auto">
        <thead className="text-left border border-zinc-950 ">
          <tr>
            <th className="border border-r-zinc-400 border-zinc-950 px-4 py-2 bg-zinc-950 text-white ">
              Nome
            </th>
            <th className="border border-x-zinc-400  border-zinc-950 px-4 py-2 bg-zinc-950 text-white ">
              Email
            </th>
            <th className="border border-r-zinc-400  border-zinc-950 px-4 py-2 bg-zinc-950 text-white "></th>
            <th className="border border-l-zinc-400  border-zinc-950 px-4 py-2 bg-zinc-950 text-white "></th>
          </tr>
        </thead>
        <tbody className="text-left border border-zinc-950 rounded-full ">
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td className="border border-zinc-950 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-zinc-950 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-zinc-950 px-4 py-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-700 text-white hover:bg-blue-600">
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Usuário</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Nome
                          </Label>
                          <Input
                            id="name"
                            placeholder={user.name}
                            className="col-span-3"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            placeholder={user.email}
                            className="col-span-3"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => handleEditUser(user.id)}
                        >
                          Salvar Alterações
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
                <td className="border border-zinc-950 px-4 py-2">
                  <Button
                    className="bg-red-700 text-white hover:bg-red-600"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={session?.user?.email === user.email}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <SignOutButton />
    </div>
  );
}
