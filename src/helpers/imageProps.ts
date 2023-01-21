interface ImageProps {
  filename: string
  width: number
  height: number
}

const imagePropsParser = (querystring: string): ImageProps => {
  const urlProps = new URLSearchParams(querystring)
  const filename = urlProps.get('filename')
  const width = urlProps.get('width')
  const height = urlProps.get('height')

  return <ImageProps>{
    filename,
    width: width ? parseInt(width, 10) : null,
    height: height ? parseInt(height, 10) : null,
  }
}

export default imagePropsParser
