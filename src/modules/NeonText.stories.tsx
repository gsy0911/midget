import React from 'react';
import {Story, Meta} from '@storybook/react';

import {NeonText, NeonTextProps} from './NeonText';

export default {
	title: 'Neon/Text',
	component: NeonText,
} as Meta;


const Template: Story<NeonTextProps> = (args) => <NeonText {...args} />;


export const Default = Template.bind({});
Default.args = {
	text: "hello, world",
};
