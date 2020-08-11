const list = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'))
list.wrapFocus = true;
function testFunct(){
  list.wrapFocus = true;
}
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));
topAppBar.listen('MDCTopAppBar:nav', () => {
drawer.open = !drawer.open;
});