import {useForm, SubmitHandler} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
type CategoryAddProps = {
  onAdd:(category: TypeInputs) => void
}
type TypeInputs = {
    name: string,
}

const CategoryAdd = (props: CategoryAddProps) => {
    const {register, handleSubmit, formState: {errors} } = useForm<TypeInputs>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<TypeInputs> = data =>{
      props.onAdd(data)
      navigate('/admin/categories')
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-3">
          <label className="form-label">Tên danh mục</label>
          <input type="text" {...register('name')} className="form-control"/>
          {errors.name && <span style={{color: 'red'}}>This field is required</span>}
        </div>
        <button className="btn btn-primary">Thêm</button>
      </div>
    </form>
  )
}

export default CategoryAdd