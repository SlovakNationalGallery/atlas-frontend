// definePage cant be used with variables or functions
// but also we cant use extendRoutes because language files are not loaded yet
// we use this composable to set the title in the locale store

export function useDefineTitle(title: string) {
  const { title: localeTitle } = toRefs(useLocaleStore())

  onMounted(async () => {
    await nextTick()
    localeTitle.value = title
  })
  onUnmounted(() => (localeTitle.value = ''))
}
