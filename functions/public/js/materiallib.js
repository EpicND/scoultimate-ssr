const list = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'))
list.wrapFocus = true;
function testFunct(){
  list.wrapFocus = true;
}
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));
topAppBar.listen('MDCTopAppBar:nav', () => {
drawer.open = !drawer.open;
// const tabBar = mdc.tabBar.MDBTabBar.attachTo(document.querySelector('.mdc-tab-bar'));

});
var tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
var contentEls = document.querySelectorAll('.content');

tabBar.listen('MDCTabBar:activated', function(event) {
  // Hide currently-active content
  document.querySelector('.content--active').classList.remove('content--active');
  // Show content for newly-activated tab
  contentEls[event.detail.index].classList.add('content--active');
});