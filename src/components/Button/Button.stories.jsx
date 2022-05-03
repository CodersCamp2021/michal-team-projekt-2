import React from 'react';

import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: { handleClick: { action: 'clicked' } },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Button',
};
