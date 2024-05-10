import { Button } from "@/components/ui/button";

import { useCreateUserMutation } from "@/services/users";
import { Link } from "react-router-dom";
import UserForm from "@/components/UserForm";
import { IUser } from "@/types";

const UserAdd = () => {
  const [createUser] = useCreateUserMutation();

  const onSubmit = (data: IUser, skills: string[]) => {
    const createdDate = new Date().toLocaleDateString();
    const user = {
      name: data.name,
      firstname: data.firstname,
      skills: skills,
      email: data.email,
      created: createdDate,
    };
    createUser(user);
  };

  return (
    <div className="container py-6 flex flex-col h-screen">
      <Link to={"/"}>
        <Button className="w-20">Назад</Button>
      </Link>
      <div className="flex items-center justify-center grow">
        <UserForm buttonText="Добавить пользователя" submitHandler={onSubmit} />
      </div>
    </div>
  );
};
export default UserAdd;
