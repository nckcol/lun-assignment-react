import computeScrollIntoView from 'compute-scroll-into-view';

export default function scrollIntoView(node, rootNode) {
  if (node === null) {
    return;
  }

  const actions = computeScrollIntoView(node, {
    boundary: rootNode,
    block: 'nearest',
    scrollMode: 'if-needed'
  });
  actions.forEach(({el, top, left}) => {
    el.scrollTop = top;
    el.scrollLeft = left;
  });
}
