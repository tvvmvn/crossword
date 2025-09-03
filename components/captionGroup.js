export default function CaptionGroup({
  name,
  captions,
}) {
  return (
    <div>
      <h3 className="my-4 text-xl font-semibold">
        {name}
      </h3>
      <ul>
        {captions.map(caption => (
          <li key={caption.id}>
            <span className="mr-2 font-semibold">
              {caption.label}
            </span>
            {caption.acrossValue || caption.downValue}
          </li>
        ))}
      </ul>
    </div>
  )
}