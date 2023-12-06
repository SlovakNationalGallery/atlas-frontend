<template>
  <Transition :duration="300">
    <div v-if="opened" class="fixed inset-0 z-10 overflow-hidden md:mx-auto md:max-w-lg">
      <div class="h-full overflow-y-auto bg-white pt-12 duration-300 pb-24">
        <Card class="bg-blue-softest" label="Pomôž nám zlepšiť Atlas">
          <div>
            Atlas neustále vyvíjame na základe odozvy od ľudí ako si aj ty! Máš nápad alebo
            pripomienku? Daj nám vedieť pomocou krátkeho dotazníka nižšie.
          </div>
          <Button class="w-full justify-center mt-4" @click="toggleSurvey">
            {{ isSurveyDone ? $t('Thank you!') : $t('Fill out a brief survey') }}
          </Button>
        </Card>

        <div class="px-4 py-2 text-xl border-b-1 border-gray-softest">
          <div class="flex items-center">
            <div class="font-bold text-xl grow">Language / Jazyk</div>
            <LanguageSwitcher />
          </div>
        </div>

        <AboutCollapsible class="scroll-mt-12 border-b-1 border-gray-softest">
          <template #summary>{{ $t('Help') }} </template>

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
</template>

<script setup lang="ts">
import AboutCollapsible from '@/components/about/AboutCollapsible.vue'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'

defineProps<{
  opened: boolean
}>()

const { toggle: toggleSurvey, isDone: isSurveyDone } = useSurvey()
</script>

<style scoped>
.v-enter-from > div,
.v-leave-to > div {
  @apply -translate-x-full;
}
</style>
