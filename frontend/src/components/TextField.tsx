interface Props {
    type: string;
    placeholder: string;
    value: string;
    error: string;
    onChange : (e : any) => void;
    icon: JSX.Element

}
const TextField = ({type, placeholder, value, error, onChange, icon}: Props) => {
  return (
        <label className="relative mb-4">
              <span className="absolute inset-4 text-gray-500">{icon}</span>
              <input
                type={type}
                placeholder={placeholder}
                className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={value}
                onChange={onChange}
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </label>
  )
}

export default TextField