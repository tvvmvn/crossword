export default function CaptionGroup({
  name,
  captions,
}) {
  
  const isDownCaption = name == '세로';
  
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
            {isDownCaption ? caption.downValue : caption.acrossValue}
          </li>
        ))}
      </ul>
    </div>
  )
}