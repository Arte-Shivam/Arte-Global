interface IconProps {
  src: string
  alt?: string
  className?: string
  size?: number
}

export function Icon({ src, alt = '', className = '', size = 24 }: IconProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`inline-block object-contain ${className}`}
      loading="lazy"
    />
  )
}
