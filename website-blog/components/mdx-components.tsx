import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

type MdxImageProps = Omit<React.ComponentProps<typeof Image>, "alt"> & {
  alt: string
}

function MdxImage({ alt, ...props }: MdxImageProps) {
  return <Image alt={alt} {...props} />
}

const components = {
  Image: MdxImage,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
