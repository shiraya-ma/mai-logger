// formatForWeb
'use string';
import { MaiLogger } from "src/mai-logger";

export function formatForWeb (option: MaiLogger.FormatOption) {
    const { tag, locales, messages, tagColors } = option;

    const _tag = `%c[${ tag.padEnd(5, ' ') }]`;

    const _date = `%c${ new Date().toLocaleString(locales) }`;

    const regColor = /^(#.{3,6}|inherit)$/;

    const _messages = messages.filter(message => !regColor.test(message));

    const _txt = `${ _tag } ${ _date } ${ _messages.join(' ')}`

    const _colors = [ tagColors[tag], tagColors.DEFAULT ].concat(messages.filter(message => regColor.test(message)));

    const _props = _colors.map(c => `color: ${ c }`);

    return [
        _txt,
        ..._props
    ];
};
