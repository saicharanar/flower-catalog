const stringifyStyle = (value) => Object.entries(value).map(attrib => attrib.join(':')).join(';');

const isKeyStyle = (key) => key === 'style';

const convertToString = ([key, value]) => {
  const newValue = isKeyStyle(key) ? stringifyStyle(value) : value;
  return [key, '="', newValue, '"'].join('');
};

const stringify = (attributes) =>
  Object.entries(attributes).map(convertToString).join(' ');

const openTag = (tag, attributes) =>
  '<' + tag + ' ' + stringify(attributes) + '>';

const closeTag = (tag) =>
  '</' + tag + '>';

const createTag = ([tag, attributes, ...content]) => {
  const newContent = content.map(element => Array.isArray(element) ? createTag(element) : element).join('');

  return openTag(tag, attributes) + newContent + closeTag(tag);
};

exports.createTag = createTag;
