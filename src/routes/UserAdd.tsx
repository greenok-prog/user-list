import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IUser {
  name: string;
  firstname: string;
  email: string;
  skills: string[];
  skill: string;
}
const schema = yup.object({
  name: yup.string().required("Обязательное поле"),
  firstname: yup.string().required("Обязательное поле"),
  email: yup.string().email("Невалидный email").required("Обязательное поле"),
  skill: yup.string(),
});
const UserAdd = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
  });

  const [skills, setSkills] = useState<string[]>([]);

  const onSubmit: SubmitHandler<IUser> = (data) => {
    const user = {
      name: data.name,
      firstname: data.firstname,
      skills: skills,
      email: data.email,
    };
  };

  const addSkill = (skill: string) => {
    if (skill.length) {
      setSkills((skills) => [...skills, skill]);
      setValue("skill", "");
    }
  };
  const removeSkill = (skill: string) => {
    setSkills((skills) => [...skills].filter((el) => el !== skill));
  };

  return (
    <div className="container flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-3 w-4/12 p-5 border border-slate-100 rounded"
      >
        <div className="grid w-full items-center gap-1.5">
          <Label>Имя</Label>
          <Input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Введите имя"
            className="w-full"
          />
          <span className="text-xs text-rose-600">{errors.name?.message}</span>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Фамилия</Label>
          <Input
            {...register("firstname")}
            type="text"
            id="firstname"
            placeholder="Введите фамилия"
          />
          <span className="text-xs text-rose-600">
            {errors.firstname?.message}
          </span>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Email</Label>
          <Input
            {...register("email")}
            type="email"
            id="firstname"
            placeholder="Введите email"
          />
          <span className="text-xs text-rose-600">{errors.email?.message}</span>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Навыки</Label>
          <div className="flex items-center space-x-2">
            <Input
              {...register("skill")}
              type="text"
              id="firstname"
              placeholder="Введите навык"
            />
            <Button type="button" onClick={() => addSkill(getValues().skill)}>
              Добавить
            </Button>
          </div>
          {skills.length > 0 && (
            <div className="border border-slate-200  rounded-md flex flex-wrap gap-2 items-center p-3">
              {skills.map((el, i) => (
                <Badge
                  onClick={() => removeSkill(el)}
                  className="cursor-pointer"
                  key={i}
                >
                  {el}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Button type="submit">Добавить пользователя</Button>
      </form>
    </div>
  );
};
export default UserAdd;
