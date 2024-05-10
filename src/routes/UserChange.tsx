import { Button } from "@/components/ui/button";
import { useGetUserQuery, useUpdateUserMutation } from "@/services/users";
import { Link, useParams } from "react-router-dom";
import UserForm from "@/components/UserForm";

interface IUser {
  name: string;
  firstname: string;
  email: string;
  skills: string[];
  skill?: string;
}

const UserChange = () => {
  let { userId } = useParams();
  const { data } = useGetUserQuery(userId ? userId : "");

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: IUser, skills: string[]) => {
    const user = {
      name: data.name,
      firstname: data.firstname,
      skills: skills,
      email: data.email,
    };
    await updateUser({
      user,
      id: userId,
    });
  };

  return (
    <div className="container py-6 flex flex-col h-screen">
      <Link to={"/"}>
        <Button className="w-20">Назад</Button>
      </Link>
      <div className="flex items-center justify-center grow">
        <UserForm
          buttonText="Изменить пользователя"
          submitHandler={onSubmit}
          data={data}
        />
      </div>
    </div>
  );
};
export default UserChange;
