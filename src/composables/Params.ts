export function useParams() {
  // unplugin-vue-router returns wrong type for useRoute().params
  // this is a workaround while we wait for a fix

  const route = useRoute()
  return route.params as Record<string, string>
}
