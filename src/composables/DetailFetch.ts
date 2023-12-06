export function useFetchDetail(fn: (id: string) => Promise<void>) {
  const params = useParams()

  onMounted(async () => {
    params.value.id && (await fn(params.value.id))
  })

  watch(
    () => params.value.id,
    (id) => {
      id && fn(params.value.id)
    }
  )
}
