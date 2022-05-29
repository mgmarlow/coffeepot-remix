type Props = React.PropsWithChildren<{
  name: string
  type?: 'text' | 'password'
  errors?: Record<string, string>
  required?: boolean
}>

const FormInput = ({
  name,
  type = 'text',
  children,
  errors,
  required = false,
}: Props) => {
  return (
    <div>
      <label htmlFor={name}>{children}</label>
      <br />
      <input
        id={name}
        name={name}
        required={required}
        type={type}
        aria-describedby={`${name}-error`}
      />
      {errors?.name && (
        <div style={{ color: 'red' }} id="name-error">
          {errors.name}
        </div>
      )}
    </div>
  )
}

export default FormInput
