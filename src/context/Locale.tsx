import dayJS from "dayjs";
import calendar from "dayjs/plugin/calendar";
import format from "dayjs/plugin/localizedFormat";
import update from "dayjs/plugin/updateLocale";
import defaultsDeep from "lodash.defaultsdeep";
import { observer } from "mobx-react-lite";

import { IntlProvider } from "preact-i18n";
import { useCallback, useEffect, useState } from "preact/hooks";

import { useApplicationState } from "../mobx/State";

import definition from "../../external/lang/en.json";

export const dayjs = dayJS;

dayjs.extend(calendar);
dayjs.extend(format);
dayjs.extend(update);

export enum Language {
    ENGLISH = "en",

    ARABIC = "ar",
    AZERBAIJANI = "az",
    BELARUSIAN = "be",
    BULGARIAN = "bg",
    BENGALI = "bn",
    CATALONIAN = "ca",
    CZECH = "cs",
    DANISH = "da",
    GERMAN = "de",
    GREEK = "el",
    SPANISH = "es",
    ESTONIAN = "et",
    FINNISH = "fi",
    FILIPINO = "fil",
    FRENCH = "fr",
    IRISH = "ga",
    HINDI = "hi",
    CROATIAN = "hr",
    HUNGARIAN = "hu",
    INDONESIAN = "id",
    ITALIAN = "it",
    JAPANESE = "ja",
    KOREAN = "ko",
    LUXEMBOURGISH = "lb",
    LITHUANIAN = "lt",
    MACEDONIAN = "mk",
    MALAY = "ms",
    NORWEGIAN_BOKMAL = "nb_NO",
    DUTCH = "nl",
    PERSIAN = "fa",
    POLISH = "pl",
    PORTUGUESE_BRAZIL = "pt_BR",
    PORTUGUESE_PORTUGAL = "pt_PT",
    ROMANIAN = "ro",
    RUSSIAN = "ru",
    SLOVAK = "sk",
    SLOVENIAN = "sl",
    SERBIAN = "sr",
    SINHALESE = "si",
    SWEDISH = "sv",
    TAMIL = "ta",
    THAI = "th",
    TURKISH = "tr",
    UKRANIAN = "uk",
    VIETNAMESE = "vi",
    CHINESE_SIMPLIFIED = "zh_Hans",

    TOKIPONA = "tokipona",
    ESPERANTO = "esperanto",

    OWO = "owo",
    PIRATE = "pr",
    BOTTOM = "bottom",
    LEET = "leet",
    PIGLATIN = "piglatin",
    ENCHANTMENT_TABLE = "enchantment",
}

export interface LanguageEntry {
    display: string;
    emoji: string;
    i18n: string;
    dayjs?: string;
    rtl?: boolean;
    cat?: "const" | "alt";
}

export const Languages: { [key in Language]: LanguageEntry } = {
    en: {
        display: "English (Traditional)",
        emoji: "????????",
        i18n: "en",
        dayjs: "en-gb",
    },

    ar: { display: "????????", emoji: "????????", i18n: "ar", rtl: true },
    az: { display: "Az??rbaycan dili", emoji: "????????", i18n: "az" },
    be: { display: "????????????????????", emoji: "????????", i18n: "be" },
    bg: { display: "??????????????????", emoji: "????????", i18n: "bg" },
    bn: { display: "???????????????", emoji: "????????", i18n: "bn" },
    ca: { display: "Catal??", emoji: "????????", i18n: "ca" },
    cs: { display: "??e??tina", emoji: "????????", i18n: "cs" },
    da: { display: "Danskers", emoji: "????????", i18n: "da" },
    de: { display: "Deutsch", emoji: "????????", i18n: "de" },
    el: { display: "????????????????", emoji: "????????", i18n: "el" },
    es: { display: "Espa??ol", emoji: "????????", i18n: "es" },
    et: { display: "eesti", emoji: "????????", i18n: "et" },
    fi: { display: "suomi", emoji: "????????", i18n: "fi" },
    fil: { display: "Pilipino", emoji: "????????", i18n: "fil", dayjs: "tl-ph" },
    fr: { display: "Fran??ais", emoji: "????????", i18n: "fr" },
    ga: { display: "Gaeilge", emoji: "????????", i18n: "ga" },
    hi: { display: "??????????????????", emoji: "????????", i18n: "hi" },
    hr: { display: "Hrvatski", emoji: "????????", i18n: "hr" },
    hu: { display: "magyar", emoji: "????????", i18n: "hu" },
    id: { display: "bahasa Indonesia", emoji: "????????", i18n: "id" },
    it: { display: "Italiano", emoji: "????????", i18n: "it" },
    ja: { display: "?????????", emoji: "????????", i18n: "ja" },
    ko: { display: "?????????", emoji: "????????", i18n: "ko" },
    lb: { display: "L??tzebuergesch", emoji: "????????", i18n: "lb" },
    lt: { display: "Lietuvi??", emoji: "????????", i18n: "lt" },
    mk: { display: "????????????????????", emoji: "????????", i18n: "mk" },
    ms: { display: "Melayu", emoji: "????????", i18n: "ms" },
    nb_NO: { display: "Norsk bokm??l", emoji: "????????", i18n: "nb_NO", dayjs: "nb" },
    nl: { display: "Nederlands", emoji: "????????", i18n: "nl" },
    fa: { display: "??????????", emoji: "????????", i18n: "fa" },
    pl: { display: "Polski", emoji: "????????", i18n: "pl" },
    pt_BR: {
        display: "Portugu??s (do Brasil)",
        emoji: "????????",
        i18n: "pt_BR",
        dayjs: "pt-br",
    },
    pt_PT: {
        display: "Portugu??s (Portugal)",
        emoji: "????????",
        i18n: "pt_PT",
        dayjs: "pt",
    },
    ro: { display: "Rom??n??", emoji: "????????", i18n: "ro" },
    ru: { display: "??????????????", emoji: "????????", i18n: "ru" },
    sk: { display: "Slovensky", emoji: "????????", i18n: "sk" },
    sl: { display: "Sloven????ina", emoji: "????????", i18n: "sl" },
    sr: { display: "????????????", emoji: "????????", i18n: "sr" },
    si: { display: "???????????????", emoji: "????????", i18n: "si" },
    sv: { display: "Svenska", emoji: "????????", i18n: "sv" },
    ta: { display: "???????????????", emoji: "????????", i18n: "ta" },
    th: { display: "?????????", emoji: "????????", i18n: "th" },
    tr: { display: "T??rk??e", emoji: "????????", i18n: "tr" },
    uk: { display: "????????????????????", emoji: "????????", i18n: "uk" },
    vi: { display: "Ti???ng Vi???t", emoji: "????????", i18n: "vi" },
    zh_Hans: {
        display: "?????? (??????)",
        emoji: "????????",
        i18n: "zh_Hans",
        dayjs: "zh",
    },

    tokipona: {
        display: "Toki Pona",
        emoji: "????",
        i18n: "tokipona",
        dayjs: "en-gb",
        cat: "const",
    },
    esperanto: {
        display: "Esperanto",
        emoji: "EO",
        i18n: "eo",
        dayjs: "en-gb",
        cat: "const",
    },

    owo: {
        display: "OwO",
        emoji: "????",
        i18n: "owo",
        dayjs: "en-gb",
        cat: "alt",
    },
    pr: {
        display: "Pirate",
        emoji: "?????????????",
        i18n: "pr",
        dayjs: "en-gb",
        cat: "alt",
    },
    bottom: {
        display: "Bottom",
        emoji: "????",
        i18n: "bottom",
        dayjs: "en-gb",
        cat: "alt",
    },
    leet: {
        display: "1337",
        emoji: "????",
        i18n: "leet",
        dayjs: "en-gb",
        cat: "alt",
    },
    enchantment: {
        display: "Enchantment Table",
        emoji: "????",
        i18n: "enchantment",
        dayjs: "en-gb",
        cat: "alt",
    },
    piglatin: {
        display: "Pig Latin",
        emoji: "????",
        i18n: "piglatin",
        dayjs: "en-gb",
        cat: "alt",
    },
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export interface Dictionary {
    dayjs?: {
        defaults?: {
            twelvehour?: "yes" | "no";
            separator?: string;
            date?: "traditional" | "simplified" | "ISO8601";
        };
        timeFormat?: string;
    };
    [key: string]:
        | Record<string, Omit<Dictionary, "dayjs">>
        | string
        | undefined;
}

export default observer(({ children }: Props) => {
    const locale = useApplicationState().locale;
    const [definitions, setDefinition] = useState<Dictionary>(
        definition as Dictionary,
    );

    const lang = locale.getLanguage();
    const source = Languages[lang];

    const loadLanguage = useCallback(
        (locale: string) => {
            if (locale === "en") {
                // If English, make sure to restore everything to defaults.
                // Use what we already have.
                const defn = transformLanguage(definition as Dictionary);
                setDefinition(defn);
                dayjs.locale("en");
                dayjs.updateLocale("en", { calendar: defn.dayjs });
                return;
            }

            import(`../../external/lang/${source.i18n}.json`).then(
                async (lang_file) => {
                    // Transform the definitions data.
                    const defn = transformLanguage(lang_file.default);

                    // Determine and load dayjs locales.
                    const target = source.dayjs ?? source.i18n;
                    const dayjs_locale = await import(
                        `../../node_modules/dayjs/esm/locale/${target}.js`
                    );

                    // Load dayjs locales.
                    dayjs.locale(target, dayjs_locale.default);

                    if (defn.dayjs) {
                        // Override dayjs calendar locales with our own.
                        dayjs.updateLocale(target, { calendar: defn.dayjs });
                    }

                    // Apply definition to app.
                    setDefinition(defn);
                },
            );
        },
        [source.dayjs, source.i18n],
    );

    useEffect(() => loadLanguage(lang), [lang, source, loadLanguage]);

    useEffect(() => {
        // Apply RTL language format.
        document.body.style.direction = source.rtl ? "rtl" : "";
    }, [source.rtl]);

    return <IntlProvider definition={definitions}>{children}</IntlProvider>;
});

/**
 * Apply defaults and process dayjs entries for a langauge.
 * @param source Dictionary definition to transform
 * @returns Transformed dictionary definition
 */
function transformLanguage(source: Dictionary) {
    // Fallback untranslated strings to English (UK)
    const obj = defaultsDeep(source, definition);

    // Take relevant objects out, dayjs and defaults
    // should exist given we just took defaults above.
    const { dayjs } = obj;
    const { defaults } = dayjs;

    // Determine whether we are using 12-hour clock.
    const twelvehour = defaults?.twelvehour
        ? defaults.twelvehour === "yes"
        : false;

    // Determine what date separator we are using.
    const separator: string = defaults?.date_separator ?? "/";

    // Determine what date format we are using.
    const date: "traditional" | "simplified" | "ISO8601" =
        defaults?.date_format ?? "traditional";

    // Available date formats.
    const DATE_FORMATS = {
        traditional: `DD${separator}MM${separator}YYYY`,
        simplified: `MM${separator}DD${separator}YYYY`,
        ISO8601: "YYYY-MM-DD",
    };

    // Replace data in dayjs object, make sure to provide fallbacks.
    dayjs["sameElse"] = DATE_FORMATS[date] ?? DATE_FORMATS.traditional;
    dayjs["timeFormat"] = twelvehour ? "hh:mm A" : "HH:mm";

    // Replace {{time}} format string in dayjs strings with the time format.
    Object.keys(dayjs)
        .filter((k) => typeof dayjs[k] === "string")
        .forEach(
            (k) =>
                (dayjs[k] = dayjs[k].replace(/{{time}}/g, dayjs["timeFormat"])),
        );

    return obj;
}
