import MarkdownIt = require('markdown-it');
import transform from './transformInteractiveElements';

const _idRecognizer = /^(mctest|gallery|map)$/i;

export default function markdownItIteractive(md: MarkdownIt) {
    const rulesFallback = md.renderer.rules.fence?.bind(md.renderer.rules); 
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
        return rulesFallback?.(tokens, idx, options, env, self) ?? `<pre>${token.content}</pre>`;
    };
};