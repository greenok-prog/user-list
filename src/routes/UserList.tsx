import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetUsersQuery, useRemoveUserMutation } from "@/services/users";
import { IUser } from "@/types";
import { UserTable } from "@/components/UserTable";

const UserList = () => {
  const { data } = useGetUsersQuery("Users");
  const [removeUser] = useRemoveUserMutation();
  const removeUserHandler = async (id: string) => {
    await removeUser(id).unwrap();
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Имя
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "firstname",
      header: "Фамилия",
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "skills",
      header: "Навыки",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex gap-2 overflow-x-auto overflow-y-auto items-center">
            {user.skills.map((el) => (
              <Badge>{el}</Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "created",
      header: "Дата регистрации",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="w-full flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to={`/${user.id}`}>
                  <DropdownMenuItem>Изменить</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={() => removeUserHandler(user.id ? user.id : "")}
                >
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container py-8">
      <Link to={"/add"}>
        <Button className="">Добавить пользователя</Button>
      </Link>
      <div className="mt-4">
        {data ? <UserTable columns={columns} data={data} /> : ""}
      </div>
    </div>
  );
};
export default UserList;
