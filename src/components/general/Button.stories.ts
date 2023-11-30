import type { Meta, StoryObj } from '@storybook/vue3'

import Button from '@/components/general/Button.vue'
import { iconControl } from '^/controls'

const meta = {
  title: 'General/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'outline'],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
    color: { control: 'text' },
    icon: iconControl(false),
  },
  args: {
    variant: 'primary',
    icon: 'chat',
    label: 'Call to action',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template:
      '<div class="flex gap-3">' +
      '   <Button v-bind="args" /><Button v-bind="args" disabled />' +
      '</div>',
  }),
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

export const NoIcon: Story = {
  args: {
    icon: undefined,
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}
