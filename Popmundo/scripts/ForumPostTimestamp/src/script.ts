/// <reference path="./constants.ts"/>
/// <reference path="./helpfull.ts"/>

(async function () {
    'use strict';

    await sleep(100);

    const messages = jQuery('#ppm-content >div.marginWrapper >.talkbox:has(>.talkbox-byline, >.tbfbll)');
    console.log("Script run. Messages: %o", messages);
    if(messages.length == 0) return;

    moment.locale(window.navigator.language);

    // lambda functions
    const builPassedTimeTextElementContent = (passedTimeText: string) => ` <span style="font-family:monospace; font-size:12px; vertical-allign:middle; color:maroon; white-space:nowrap;">(${passedTimeText})</span>`;
    const timeText2Date = (timeText: string) => {
        // @ts-expect-error
        let { groups: { day, month, year, hour, minute } } =
            <RegExpMatchArray>timeText.trim().match(timeRegex);
        return new Date(year, month - 1, day, hour, minute);
    }

    // loop the messages
    messages.each((i) => {
        const message = messages.eq(i);


        // Edited message time
        {
            const messageEditedParagraph = message.find('>.talkbox-content >div >p.em:first');
            if (messageEditedParagraph.length) {
                const timeTextElement = messageEditedParagraph.contents().last()[0];
                const passedTimeText = moment(timeText2Date(timeTextElement.textContent as string)).fromNow();
                messageEditedParagraph.append(builPassedTimeTextElementContent(passedTimeText));
            }
        }

        // Created message time
        {

            const messageCreatedParagraph = message.find('>.talkbox-byline p:first, >.tbfbll p:first');
            if (messageCreatedParagraph.length) {
                const timeTextElement = messageCreatedParagraph.contents().last()[0];
                const passedTimeText = moment(timeText2Date(timeTextElement.textContent as string)).fromNow();

                switch (displayPreference as TimeStampVisiblePreferences) {
                    case TimeStampVisiblePreferences.left:
                        const span = jQuery(`<span style=" position: absolute; top: 0; font-size:11px; color:maroon; writing-mode: vertical-rl; /* text-orientation: upright; */ /* z-index: 2; */ ">${passedTimeText}</span>`)
                            .appendTo(message);
                        message.css({ 'overflow': 'unset', 'position': 'relative' });

                        span.css('top', Math.max(3, Math.floor((<number>message.find('>div:first').height() - <number>span.height()) / 2)))
                            .css('left', -13 - (<number>span.width() - 13.6));
                        break;

                    case TimeStampVisiblePreferences.onTimeText:
                        messageCreatedParagraph.append(builPassedTimeTextElementContent(passedTimeText));
                        break;

                    default:
                        throw new Error(`Unknown TimeStampVisiblePreferences: ${displayPreference}`);
                }
            }
        }


    });

})();