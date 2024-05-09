import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const UserList = () => {
  return (
    <div className="container py-8">
      <Link to={"/add"}>
        <Button className="">Добавить пользователя</Button>
      </Link>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Фамилия</TableHead>
            <TableHead>Email</TableHead>
            <TableHead style={{ width: "300px" }}>Навыки</TableHead>
            <TableHead>Дата регистрации</TableHead>
            <TableHead style={{ width: "50px" }}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Артем</TableCell>
            <TableCell>Фризен</TableCell>
            <TableCell>test@gmail.com</TableCell>
            <TableCell
              width={300}
              height={70}
              className="flex gap-2 flex-wrap overflow-y-auto"
            >
              <Badge className="content-center py-2 cursor-pointer">
                Находчивость
              </Badge>
              <Badge className="content-center py-2 cursor-pointer">
                Гений
              </Badge>
            </TableCell>
            <TableCell>09.05.2024</TableCell>
            <TableCell width={50}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to={"/1"}>
                    <DropdownMenuItem>Изменить</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Удалить</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default UserList;
