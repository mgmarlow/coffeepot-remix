import FormControl from './FormControl'

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label: string
  name: string
  errors?: Record<string, string>
}

const Input = ({ label, errors, name, ...inputProps }: Props) => {
  return (
    <FormControl label={label} errors={errors} name={name}>
      <input
        id={name}
        name={name}
        aria-describedby={`${name}-error`}
        {...inputProps}
      />
    </FormControl>
  )
}

export default Input
