export default function Cell({
  id,
  available,
  label,
  value,
  acrossActive,
  downActive,
  error,
  disabled,
  handleClick
}) {

  function bgColor() {
    if (error) {
      return "bg-red-200"
    }
    if (acrossActive) {
      return "bg-blue-200"
    }
    if (downActive) {
      return "bg-yellow-200"
    }
    return "bg-white"
  }

  return (
    <td className="relative pt-[100%]">
      {label && (
        <label
          htmlFor={id}
          className="absolute top-0 left-0 px-1 font-semibold text-black z-10"
        >
          {label}
        </label>
      )}
      {available && (
        <input
          id={id}
          type="text"
          className={`absolute inset-0 ${bgColor()} text-center outline-none`}
          readOnly={true}
          disabled={disabled}
          value={value}
          onClick={handleClick}
        />
      )}
    </td>
  )
}