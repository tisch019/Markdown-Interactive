import MarkdownIt = require('markdown-it');
import transform from './transformInteractiveElements';

const _idRecognizer = /^(mctest|gallery|quiz)$/i;
export default function markdownItIteractive(md: MarkdownIt) {
    const fallbackRender = md.render;
    md.render = (src, env) => {
        //TODO Add JavaScript to src
        return fallbackRender(src, env);
    };
    const fallback = md.renderer.rules.fence?.bind(md.renderer.rules);
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        if (_idRecognizer.test(token.info)) {
            try {
                let htmlSnippet = transform(token.info, token.content);

                return htmlSnippet;
            } catch (ex) {
                return `<pre>${ex}</pre>`;
            }
        }

        return fallback?.(tokens, idx, options, env, self) ?? `<pre>${token.content}</pre>`;
    };
};