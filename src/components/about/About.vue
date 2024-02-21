<template>
  <Transition :duration="300">
    <div v-if="opened" class="fixed inset-0 z-10 overflow-hidden md:mx-auto md:max-w-lg">
      <div class="h-full overflow-y-auto bg-white pt-12 duration-300 pb-24">
        <Card class="bg-blue-softest" :label="$t('Help us improve Atlas SNG')">
          <div class="text-lg leading-[26px]">
            {{
              $t(
                "We're constantly developing the app based on feedback from people like you! Have an idea or comment? Let us know via the short questionnaire below."
              )
            }}
          </div>
          <Button class="w-full justify-center mt-4" @click="toggleSurvey">
            {{ $t('Fill out a brief survey') }}
          </Button>
        </Card>

        <div class="px-4 py-2 text-xl border-b-1 border-gray-softest">
          <div class="flex items-center">
            <div class="font-bold text-xl grow leading-7">Jazyk / Language</div>
            <LanguageSwitcher />
          </div>
        </div>

        <AboutCollapsible class="scroll-mt-12 border-b-1 border-gray-softest">
          <template #summary>{{ $t('Help') }} </template>

          <div class="space-y-6">
            <div>
              <strong>{{ $t('Can I use the gallery WiFi?') }}</strong>
              <p class="mt-6" v-html="$t('about_help_1')"></p>
            </div>
            <div>
              <strong>{{ $t('How do I explore an artwork?') }}</strong>
              <p class="mt-6" v-html="$t('about_help_2')"></p>
            </div>
            <div>
              <strong>{{ $t("What if I don't see a code?") }}</strong>
              <p class="mt-6" v-html="$t('about_help_3')"></p>
            </div>
            <div>
              <strong>{{ $t("Can I revisit artworks I've already explored?") }}</strong>
              <p class="mt-6" v-html="$t('about_help_4')"></p>
            </div>
            <div>
              <strong>{{ $t('How do I claim my reward for the Scavenger hunt?') }}</strong>
              <p class="mt-6" v-html="$t('about_help_5')"></p>
            </div>
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
                :href="$t('https://sng.sk/en/slovak-national-gallery/page/projects/making-meaning-of-digital-collections')"
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
          <p>
            <strong>{{ $t('Project lead') }}</strong> <br />Michal Čudrnák
          </p>
          <p class="mt-4">
            <strong>{{ $t('Content') }}</strong> <br />Lukáš Štepanovský, Viera Kleinová, Michaela
            Kováčová, Romana Halgošová, Zuzana Koblišková, Karin Vicianová
          </p>
          <p class="mt-4">
            <strong>{{ $t('Design') }}</strong> <br />Filip Ruisl
          </p>
          <p class="mt-4">
            <strong>{{ $t('Development') }}</strong> <br />Igor Rjabinin, Mayo Horkovič, František
            Sebestyén, Rastislav Chynoranský, Ernest Walzel
          </p>
          <p class="mt-4">
            <strong>{{ $t('Research') }}</strong> <br />Katarína Vass, Jana Šuchová
          </p>
          <p class="mt-4">
            <strong>{{ $t('Production') }}</strong> <br />Branislav Matis, Gabriel Balkó
          </p>
          <p class="mt-4">
            <strong>{{ $t('Proofreading') }}</strong> <br />Soňa Hrúziková, Luďka Kratochvílová
          </p>
          <p class="mt-4">
            <strong>{{ $t('English translation') }}</strong> <br />Lukáš Štepanovský, Michal
            Frontczak
          </p>
        </AboutCollapsible>
        <AboutCollapsible class="scroll-mt-12 border-b-1 border-gray-softest">
          <template #summary>{{ $t('Used sources') }}</template>
          <p>
            {{ $t('Bibliography will be updated soon.') }}
          </p>
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
