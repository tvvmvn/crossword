export default function CaptionGroup({
  name,
  captions,
}) {
  
  const down = name == 'DOWN';
  
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
            {down ? caption.downValue : caption.acrossValue}
          </li>
        ))}
      </ul>
    </div>
  )
}