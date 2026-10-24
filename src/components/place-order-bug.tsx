/**
 * Throws outside React's event try/catch. monkeytest records that as a
 * page-error, which is the same signal as the core demo fixture's save button.
 * The listener is a no-op in fixed mode, and the button's name does not change.
 */
const PLACE_ORDER_BUG = `
document.addEventListener('click', function (event) {
  var target = event.target;
  if (!target || !target.closest) return;
  var button = target.closest('#place-order');
  if (!button) return;
  if (document.body.getAttribute('data-monkeytest-mode') !== 'buggy') return;
  event.preventDefault();
  event.stopPropagation();
  window.setTimeout(function () {
    throw new Error('save failed');
  }, 0);
}, true);
`;

export function PlaceOrderBugScript() {
  return <script dangerouslySetInnerHTML={{ __html: PLACE_ORDER_BUG }} />;
}
