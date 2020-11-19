import MarkdownIt = require('markdown-it');
import transform from './transformInteractiveElements';
//import { transform } from 'markmap-lib/dist/transform';
//import { Base64 } from 'js-base64';

//const _idRecognizer = /^\s*(markmap|mdmm|mmmd)((\s+|:|\{)[^`~]*)?$/i;
const _idRecognizer = /^(mctest|gallery|quiz)$/i;

export default function markdownItIteractive(md: MarkdownIt) {
    const fallback = md.renderer.rules.fence?.bind(md.renderer.rules);

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        if (_idRecognizer.test(token.info)) {
            try {
                const attrs = token.attrs ? token.attrs.map(e => ({ [e[0].toLowerCase()]: e[1] })) : [];
                //const { root } = transform(token.content);
                //const data = { attrs: Object.assign({}, ...attrs), root };
                //const data = { attrs: Object.assign({}, ...attrs), root };
                let HTMLSnippet = transform(token.info, token.content);

                return HTMLSnippet;
            } catch (ex) {
                return `<pre>${ex}</pre>`
            }
        }

        return fallback?.(tokens, idx, options, env, self) ?? `<pre>${token.content}</pre>`;
    };
};