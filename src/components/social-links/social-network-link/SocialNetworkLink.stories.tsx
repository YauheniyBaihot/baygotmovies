import type { Meta, StoryObj } from "@storybook/react";

import { SocialNetworkLink } from "./SocialNetworkLink";

const meta: Meta<typeof SocialNetworkLink> = {
  title: "components/SocialNetworkLink",
  component: SocialNetworkLink,
};

export default meta;
type Story = StoryObj<typeof SocialNetworkLink>;

export const Primary: Story = {
  args: {
    variant: "telegram",
    path: "https://google.com",
  },
};
