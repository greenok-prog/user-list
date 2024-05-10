import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface IUser {
  name: string;
  firstname: string;
  email: string;
  skills: string[];
  skill: string;
}
interface IProps {
  buttonText: string;
  submitHandler: any;
  data?: IUser;
}

const schema = yup.object({
  name: yup.string().required("Обязательное поле"),
  firstname: yup.string().required("Обязательное поле"),
  email: yup.string().email("Невалидный email").required("Обязательное поле"),
  skill: yup.string(),
});
const UserForm = ({ buttonText, submitHandler, data }: IProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
    values: data ? data : undefined,
  });

  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (data?.skills.length) {
      setSkills(data.skills);
    }
  }, [data]);

  const addSkill = (skill: string) => {
    if (skill.length) {
      setSkills((skills) => [...skills, skill]);
      setValue("skill", "");
    }
  };
  const removeSkill = (skill: string) => {
    setSkills((skills) => [...skills].filter((el) => el !== skill));
  };
  const submit: SubmitHandler<IUser> = (data) => {
    submitHandler(data, skills);
    navigate("/");
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      action=""
      className="flex flex-col w-11/12 md:w-5/12 gap-3  p-5 border border-slate-100 rounded "
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
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};
export default UserForm;
