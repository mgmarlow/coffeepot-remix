export type Props = React.PropsWithChildren<{
  name: string
  label: string
  errors?: Record<string, string>
}>

const FormControl = ({ label, children, errors, name }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      {children}
      {errors && errors[name] && (
        <div style={{ color: '#ff6666' }} id={`${name}-error`}>
          {errors[name]}
        </div>
      )}
    </div>
  )
}

export default FormControl
