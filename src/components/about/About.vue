<template>
  <Transition :duration="300">
    <div v-if="opened" class="fixed inset-0 z-10 overflow-hidden md:mx-auto md:max-w-lg">
      <div class="h-full overflow-y-auto bg-white pt-[48px] duration-300">
        <div class="border-b-1 border-gray-softest">
          <div class="my-8 flex items-end justify-between">
            <div class="self-items-end mx-4">
              <SvgLogo class="mb-7 !h-[46px] !w-[46px]" viewBox="3.3 3.3 28.7 28.7" />
              <h1 class="font-bold leading-10">
                <span class="text-[52px]">Atlas</span><br />
                <span class="text-[42px]">SNG</span>
              </h1>
            </div>
            <div>
              <img src="@/img/about-ester.png" />
            </div>
          </div>

          <div class="m-4 space-y-4 text-xl">
            <div
              v-if="!isSurveyDone"
              class="flex rounded-xl border-2 border-black bg-green/30 p-2.5"
            >
              <div class="shrink-0">
                <SvgInfo />
              </div>
              <div class="pl-2">
                {{
                  $t(
                    'The development of the app is ongoing, we are improving it according to feedback. Do you want to help us?'
                  )
                }}
                <a href="#" class="underline" @click="toggleSurvey">{{
                  $t('Fill out a brief survey!')
                }}</a>
              </div>
            </div>
            <p v-html="$t('about_perex_1')"></p>
            <p v-html="$t('about_perex_2')"></p>
          </div>
        </div>

        <AboutCollapsible :initial-open="true" class="scroll-mt-12 border-b-1 border-gray-softest">
          <template #summary>{{ $t('How to?') }} </template>

          <div class="space-y-4">
            <ul class="ml-6 list-disc">
              <li class="pl-2.5">
                {{
                  $t(
                    'Enter the code next to the artwork into the grid in the app. Feel free to try a random one.'
                  )
                }}
              </li>
              <li class="pl-2.5">
                {{
                  $t(
                    "You'll also find a link to other works by the artist in the artwork's profile."
                  )
                }}
              </li>
              <li class="pl-2.5">
                {{ $t('You can come back to your artworks later, Atlas remembers them.') }}
              </li>
            </ul>
          </div>
        </AboutCollapsible>
        <AboutCollapsible class="scroll-mt-12 border-b-1 border-gray-softest">
          <template #summary>{{ $t('Settings') }}</template>

          <div class="items-center flex">
            <div class="grow">{{ $t('Reload the conversation from the beginning') }}</div>
            <button
              class="flex-none rounded-xl bg-black py-2 px-3 text-sm font-medium leading-4.5 text-white"
              @click="shownResetModal = true"
            >
              {{ $t('Reset') }}
            </button>
          </div>
        </AboutCollapsible>
        <AboutCollapsible class="scroll-mt-12 border-b-1 border-gray-softest">
          <template #summary>{{ $t('About the project') }}</template>

          <div class="space-y-4">
            <p v-html="$t('about_project_1')"></p>
            <p v-html="$t('about_project_2')"></p>
            <p>
              <a
                class="underline hover:no-underline"
                href="https://www.sng.sk/sk/vyskum/projekty/ako-porozumiet-digitalnym-zbierkam"
                target="_blank"
                >{{ $t('More about the project') }}</a
              >
            </p>
          </div>

          <img
            class="mt-8 max-w-[8rem]"
            src="@/img/eea_grants.png"
            alt="Iceland Lichtenstein Norway grants"
          />
        </AboutCollapsible>
        <AboutCollapsible class="scroll-mt-12 border-b-1 border-gray-softest">
          <template #summary>{{ $t('Made by') }} lab.SNG</template>
          <ul>
            <li>Gabriel Balkó: {{ $t('Production') }}</li>
            <li>Michal Čudrnák: {{ $t('Project lead') }}</li>
            <li>Dominika Čupková: {{ $t('Video') }}</li>
            <li>Romana Halgošová: {{ $t('Video') }}</li>
            <li>Rastislav Chynoranský: {{ $t('Development') }}</li>
            <li>Mayo Horkovič: {{ $t('Development') }}</li>
            <li>Zuzana Koblišková: {{ $t('Content, English translation') }}</li>
            <li>Michaela Kováčová: {{ $t('Content') }}</li>
            <li>Igor Rjabinin: {{ $t('Development') }}</li>
            <li>Filip Ruisl: {{ $t('UX design, graphic design') }}</li>
            <li>František Sebestyén: {{ $t('Development') }}</li>
            <li>Lukáš Štepanovský: {{ $t('Content, UX design, concept') }}</li>
            <li>Jana Šuchová: {{ $t('Artist research') }}</li>
            <li>Barbora Tribulová: {{ $t('Content') }}</li>
            <li>Katarína Vass: {{ $t('User research') }}</li>
            <li>Karin Vicianová: {{ $t('Content') }}</li>
            <li>Ernest Walzel: {{ $t('Development') }}</li>
          </ul>
        </AboutCollapsible>
      </div>
    </div>
  </Transition>

  <CardModal :visible="shownResetModal" @close="shownResetModal = false">
    <h3 class="my-4 text-2xl font-bold">{{ $t('Reset the conversation') }}</h3>
    <div class="text-lg leading-7">
      <p>
        {{
          $t(
            'Are you sure you want to reset your conversation with Ester? It will start from the very beginning. This step can not be undone.'
          )
        }}
      </p>
      <p class="mt-2 font-bold">{{ $t('Your collection remains saved!') }}</p>
    </div>
    <div class="flex space-x-3">
      <ConfirmButton class="my-4 bg-black text-white" @click="resetInteraction">{{
        $t('Reset')
      }}</ConfirmButton>
      <ConfirmButton class="my-4" @click="shownResetModal = false">{{ $t('Close') }}</ConfirmButton>
    </div>
  </CardModal>
</template>

<script setup lang="ts">
import AboutCollapsible from '@/components/about/AboutCollapsible.vue'
import CardModal from '@/components/layout/CardModal.vue'
import ConfirmButton from '@/components/forms/ConfirmButton.vue'

defineProps<{
  opened: boolean
}>()

const interactionStore = useInteractionStore()
const { toggle: toggleSurvey, isDone: isSurveyDone } = useSurvey()

const shownResetModal = ref(false)

const resetInteraction = () => {
  interactionStore.clear()
  window.location.reload()
}
</script>

<style scoped>
.v-enter-from > div,
.v-leave-to > div {
  @apply -translate-x-full;
}
</style>
