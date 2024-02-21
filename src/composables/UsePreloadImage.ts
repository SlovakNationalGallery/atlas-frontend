export function usePreloadImage(imageUrl: string) {
  const isLoading = ref(true)

  onMounted(() => {
    const image = new Image()

    image.src = imageUrl
    image.onload = async () => {
      await new Promise((resolve) => setTimeout(resolve, 333))
      isLoading.value = false
    }
  })

  return {
    isLoading,
  }
}
