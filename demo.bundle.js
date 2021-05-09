/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./demo.js":
/*!*****************!*\
  !*** ./demo.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const pianoKeys = __webpack_require__(/*! ./index.js */ \"./index.js\")\n\nconst pre = document.getElementsByTagName('pre')[0]\n\nfunction output(string) {\n  pre.innerHTML = `${string}\\n${pre.innerHTML}`\n}\n\nfunction register(description, keyup) {\n  pianoKeys(window, description, () => output(description), keyup)\n}\n\nregister('a')\nregister('shift+a')\nregister('b+c')\nregister('d e')\nregister('ctrl+q')\nregister('up up left left')\nregister('x down+right')\nregister('up+left down+right')\nregister('space')\nregister('ctrl+space')\nregister('s', true)\nregister('f f g', true)\nregister('up+a down+z', true)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kZW1vLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGlhbm8ta2V5cy8uL2RlbW8uanM/N2UxOSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwaWFub0tleXMgPSByZXF1aXJlKCcuL2luZGV4LmpzJylcblxuY29uc3QgcHJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpWzBdXG5cbmZ1bmN0aW9uIG91dHB1dChzdHJpbmcpIHtcbiAgcHJlLmlubmVySFRNTCA9IGAke3N0cmluZ31cXG4ke3ByZS5pbm5lckhUTUx9YFxufVxuXG5mdW5jdGlvbiByZWdpc3RlcihkZXNjcmlwdGlvbiwga2V5dXApIHtcbiAgcGlhbm9LZXlzKHdpbmRvdywgZGVzY3JpcHRpb24sICgpID0+IG91dHB1dChkZXNjcmlwdGlvbiksIGtleXVwKVxufVxuXG5yZWdpc3RlcignYScpXG5yZWdpc3Rlcignc2hpZnQrYScpXG5yZWdpc3RlcignYitjJylcbnJlZ2lzdGVyKCdkIGUnKVxucmVnaXN0ZXIoJ2N0cmwrcScpXG5yZWdpc3RlcigndXAgdXAgbGVmdCBsZWZ0JylcbnJlZ2lzdGVyKCd4IGRvd24rcmlnaHQnKVxucmVnaXN0ZXIoJ3VwK2xlZnQgZG93bityaWdodCcpXG5yZWdpc3Rlcignc3BhY2UnKVxucmVnaXN0ZXIoJ2N0cmwrc3BhY2UnKVxucmVnaXN0ZXIoJ3MnLCB0cnVlKVxucmVnaXN0ZXIoJ2YgZiBnJywgdHJ1ZSlcbnJlZ2lzdGVyKCd1cCthIGRvd24reicsIHRydWUpXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./demo.js\n");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module) => {

eval("const keyCodes = {\n  Alt: 'alt',\n  AltGraph: 'altgr',\n  ArrowDown: 'down',\n  ArrowLeft: 'left',\n  ArrowRight: 'right',\n  ArrowUp: 'up',\n  Backspace: 'backspace',\n  CapsLock: 'capslock',\n  Command: 'cmd',\n  ContextMenu: 'contextmenu',\n  Control: 'ctrl',\n  Delete: 'delete',\n  End: 'end',\n  Enter: 'enter',\n  Escape: 'escape',\n  Home: 'home',\n  Insert: 'insert',\n  Meta: 'cmd',\n  NumLock: 'numlock',\n  Shift: 'shift',\n  Tab: 'tab',\n  '+': 'plus',\n  ' ': 'space',\n}\n\nconst hashPattern = pattern => JSON.stringify(pattern.map(x => [...new Set(x)].sort()))\n\nfunction comparePattern(pattern, source) {\n  const sourceHash = hashPattern(source)\n\n  for (let i = 0; i < pattern.length - source.length + 1; i++) {\n    if (hashPattern(pattern.slice(i)) === sourceHash) return true\n  }\n}\n\nfunction pianoKeys(element, description, handler, keyUp) {\n  let keys\n  let pattern = [[]]\n\n  try {\n    keys = description.toLowerCase().split(' ').map(x => x.split('+'))\n  }\n  catch (error) {\n    throw new Error('Invalid keys description')\n  }\n\n  if (!keys.length || keys.some(x => !x.length || x.some(code => code === ''))) {\n    throw new Error('Invalid keys description')\n  }\n\n  function handleKeyDown(event) {\n    const code = keyCodes[event.key] || event.key.toLowerCase()\n\n    pattern[pattern.length - 1].push(code)\n\n    if (!keyUp && comparePattern(pattern, keys)) {\n      pattern = [[]]\n\n      return handler(event)\n    }\n  }\n\n  function handleKeyUp(event) {\n    if (keyUp && comparePattern(pattern, keys)) {\n      pattern = [[]]\n\n      return handler(event)\n    }\n\n    if (pattern[pattern.length - 1].length) {\n      pattern.push([])\n    }\n\n    // Prevent memory leaks\n    if (pattern.length > keys.length) {\n      pattern = pattern.slice(pattern.length - keys.length)\n    }\n  }\n\n  element.addEventListener('keydown', handleKeyDown)\n  element.addEventListener('keyup', handleKeyUp)\n\n  return () => {\n    element.removeEventListener('keydown', handleKeyDown)\n    element.removeEventListener('keyup', handleKeyUp)\n  }\n}\n\nmodule.exports = pianoKeys\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3BpYW5vLWtleXMvLi9pbmRleC5qcz80MWY1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGtleUNvZGVzID0ge1xuICBBbHQ6ICdhbHQnLFxuICBBbHRHcmFwaDogJ2FsdGdyJyxcbiAgQXJyb3dEb3duOiAnZG93bicsXG4gIEFycm93TGVmdDogJ2xlZnQnLFxuICBBcnJvd1JpZ2h0OiAncmlnaHQnLFxuICBBcnJvd1VwOiAndXAnLFxuICBCYWNrc3BhY2U6ICdiYWNrc3BhY2UnLFxuICBDYXBzTG9jazogJ2NhcHNsb2NrJyxcbiAgQ29tbWFuZDogJ2NtZCcsXG4gIENvbnRleHRNZW51OiAnY29udGV4dG1lbnUnLFxuICBDb250cm9sOiAnY3RybCcsXG4gIERlbGV0ZTogJ2RlbGV0ZScsXG4gIEVuZDogJ2VuZCcsXG4gIEVudGVyOiAnZW50ZXInLFxuICBFc2NhcGU6ICdlc2NhcGUnLFxuICBIb21lOiAnaG9tZScsXG4gIEluc2VydDogJ2luc2VydCcsXG4gIE1ldGE6ICdjbWQnLFxuICBOdW1Mb2NrOiAnbnVtbG9jaycsXG4gIFNoaWZ0OiAnc2hpZnQnLFxuICBUYWI6ICd0YWInLFxuICAnKyc6ICdwbHVzJyxcbiAgJyAnOiAnc3BhY2UnLFxufVxuXG5jb25zdCBoYXNoUGF0dGVybiA9IHBhdHRlcm4gPT4gSlNPTi5zdHJpbmdpZnkocGF0dGVybi5tYXAoeCA9PiBbLi4ubmV3IFNldCh4KV0uc29ydCgpKSlcblxuZnVuY3Rpb24gY29tcGFyZVBhdHRlcm4ocGF0dGVybiwgc291cmNlKSB7XG4gIGNvbnN0IHNvdXJjZUhhc2ggPSBoYXNoUGF0dGVybihzb3VyY2UpXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aCAtIHNvdXJjZS5sZW5ndGggKyAxOyBpKyspIHtcbiAgICBpZiAoaGFzaFBhdHRlcm4ocGF0dGVybi5zbGljZShpKSkgPT09IHNvdXJjZUhhc2gpIHJldHVybiB0cnVlXG4gIH1cbn1cblxuZnVuY3Rpb24gcGlhbm9LZXlzKGVsZW1lbnQsIGRlc2NyaXB0aW9uLCBoYW5kbGVyLCBrZXlVcCkge1xuICBsZXQga2V5c1xuICBsZXQgcGF0dGVybiA9IFtbXV1cblxuICB0cnkge1xuICAgIGtleXMgPSBkZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJykubWFwKHggPT4geC5zcGxpdCgnKycpKVxuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBrZXlzIGRlc2NyaXB0aW9uJylcbiAgfVxuXG4gIGlmICgha2V5cy5sZW5ndGggfHwga2V5cy5zb21lKHggPT4gIXgubGVuZ3RoIHx8IHguc29tZShjb2RlID0+IGNvZGUgPT09ICcnKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQga2V5cyBkZXNjcmlwdGlvbicpXG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgY29uc3QgY29kZSA9IGtleUNvZGVzW2V2ZW50LmtleV0gfHwgZXZlbnQua2V5LnRvTG93ZXJDYXNlKClcblxuICAgIHBhdHRlcm5bcGF0dGVybi5sZW5ndGggLSAxXS5wdXNoKGNvZGUpXG5cbiAgICBpZiAoIWtleVVwICYmIGNvbXBhcmVQYXR0ZXJuKHBhdHRlcm4sIGtleXMpKSB7XG4gICAgICBwYXR0ZXJuID0gW1tdXVxuXG4gICAgICByZXR1cm4gaGFuZGxlcihldmVudClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVLZXlVcChldmVudCkge1xuICAgIGlmIChrZXlVcCAmJiBjb21wYXJlUGF0dGVybihwYXR0ZXJuLCBrZXlzKSkge1xuICAgICAgcGF0dGVybiA9IFtbXV1cblxuICAgICAgcmV0dXJuIGhhbmRsZXIoZXZlbnQpXG4gICAgfVxuXG4gICAgaWYgKHBhdHRlcm5bcGF0dGVybi5sZW5ndGggLSAxXS5sZW5ndGgpIHtcbiAgICAgIHBhdHRlcm4ucHVzaChbXSlcbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IG1lbW9yeSBsZWFrc1xuICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA+IGtleXMubGVuZ3RoKSB7XG4gICAgICBwYXR0ZXJuID0gcGF0dGVybi5zbGljZShwYXR0ZXJuLmxlbmd0aCAtIGtleXMubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24pXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBoYW5kbGVLZXlVcClcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleURvd24pXG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZUtleVVwKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGlhbm9LZXlzXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./index.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./demo.js");
/******/ 	
/******/ })()
;