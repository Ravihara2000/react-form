import { useForm } from "react-hook-form";
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
const schema = z.object({
  fullName:z.string().max(50).min(3,{message:"Name must be between 3 and 10 characters"}),
  email:z.string().email(),
  password:z.string().min(8),
  address:z.string().min(10),
  age:z.number({invalid_type_error:"Age must be a number"}).min(18,{message:"You must be 18 or older to register"}),
})

type FormData = z.infer<typeof schema>

const Form = () => {
  const {register,handleSubmit,formState:{errors,isValid}} = useForm<FormData>({resolver:zodResolver(schema),mode: "onChange"});
  
  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="mb-4">
          <label className="form-label" htmlFor="fullName">
            Full Name
          </label>
          <input {...register("fullName")} type="text" id="fullName" className="form-control" />
          {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input {...register("email")}type="email" id="email" className="form-control" />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input {...register("password")}type="password" id="password" className="form-control" />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
          <label className="form-label" htmlFor="address">
            Address
          </label>
          <input {...register("address")}type="text" id="address" className="form-control" />
          {errors.address && <p className="text-danger">{errors.address.message}</p>}
          <label className="form-label" htmlFor="age">
            Age
          </label>
          <input {...register("age",{valueAsNumber:true})}type="number" id="age" className="form-control"/>
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
