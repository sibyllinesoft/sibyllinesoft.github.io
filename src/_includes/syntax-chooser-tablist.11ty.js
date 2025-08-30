async function render({ id, valid, additions, subtractions, only, label }) {
  const syntaxes = {};

  const extraSyntaxes = {
    html: 'HTML',
    md: 'Markdown',
    webc: 'WebC',
    jsesm: 'ESM',
    jscjs: 'CommonJS',
    any: 'Any',
    hbs: 'Handlebars'
  };

  const syntaxMap = {
    liquid: 'Liquid',
    njk: 'Nunjucks',
    js: '11ty.js',
    cjs: '11ty.cjs'
  };

  // Extras go first (unless hbs)
  let addHbs = false;
  const syntaxAddArray = (additions || '').split(',').filter((entry) => !!entry);
  for (const syn of syntaxAddArray) {
    if (extraSyntaxes[syn]) {
      if(syn == 'hbs') {
        addHbs = true;
      } else {
        syntaxes[syn] = extraSyntaxes[syn];
      }
    }
  }

  if (only) {
    for (const syn of (only || '').split(',')) {
      syntaxes[syn] = extraSyntaxes[syn] || syntaxMap[syn];
    }
  } else {
    Object.assign(syntaxes, syntaxMap);
  }

  if(addHbs) {
    syntaxes.hbs = extraSyntaxes.hbs;
  }

  for (const syn of (subtractions || '').split(',')) {
    if (syn) {
      delete syntaxes[syn];
    }
  }

  const str = [];
  const validArray = (valid || '').split(',').filter((entry) => !!entry);

  // e.g. Liquid has no tab content but was first in the tab list
  // If a user comes without a preference, don’t show liquid by default
  let defaultOnNoPreference = ' or syntax == "" or syntax == undefined';

  for (const syn in syntaxes) {
    const isPreferenceSelectable =
			validArray.length === 0 || validArray.includes(syn);

    str.push(
      `<a href="#${id}-${syn}" role="tab" data-tabs-persist="templatelang:${syn}"{% if syntax == "${syn}"${
        isPreferenceSelectable ? defaultOnNoPreference : ''
      } %} aria-selected="true"{% endif %}>${syntaxes[syn]}</a>`
    );

    // only the first one should default
    if (isPreferenceSelectable) {
      defaultOnNoPreference = '';
    }
  }

  const liquidTemplate = `
{% assign syntax = false %}
<div role="tablist" aria-label="Template Language Chooser"${label ? ' class="has-label"' : ''}>
	${label ? `${label}: ` : ''}${str.join('\n')}
</div>`;

  return await this.renderTemplate(liquidTemplate, 'liquid');
}

export { render };
