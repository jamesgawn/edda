export function logDeep (object: any) {
  console.dir(
    object,
    {
      depth: 5
    }
  )
}