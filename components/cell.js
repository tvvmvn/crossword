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
      return "bg-red-100"
    }
    if (acrossActive) {
      return "bg-blue-100"
    }
    if (downActive) {
      return "bg-yellow-100"
    }
    return "bg-white"
  }

  return (
    <td className="relative pt-[100%]">
      {label && (
        <label
          htmlFor={id}
          className="absolute top-0 left-0 px-1 font-semibold text-black/[0.2] z-10"
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