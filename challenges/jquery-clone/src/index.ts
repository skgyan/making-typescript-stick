import {default as fetch} from "node-fetch";

class SelectorResult {

  #elements
  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }
  html(contents: string) {
    this.#elements.forEach(element => element.innerHTML = contents);
  }
  on<K extends keyof HTMLElementEventMap>(event: K, callback: (event: HTMLElementEventMap[K]) => void) {
    this.#elements.forEach(element => {
      const elem = element as HTMLElement;
      elem.addEventListener(event, callback)
    });
  }
  show() {
    this.#elements.forEach(element => 
      {
      const htmlElem = element as HTMLElement;
      htmlElem.style.visibility = "visible";
      });
  }
  hide() {
    this.#elements.forEach(element => 
      {
      const htmlElem = element as HTMLElement;
      htmlElem.style.visibility = "hidden";
      });
  }
}

function $(selector: string) {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax({url, success}: {url: string, success: (data: any) => void}): any {
    return fetch(url).then(response => response.json()).then(success);
  }

}

export default $;
/**
 * Get the <button> element with the class 'continue'
 * and change its HTML to 'Next Step...'
 */
 $("button.continue").html("Next Step...")
 
 /**
  * Show the #banner-message element that is hidden with visibility:"hidden" in
  * its CSS when any button in #button-container is clicked.
  */
 const hiddenBox = $("#banner-message")
 $("#button-container button").on("click", (event) => {
   hiddenBox.show()
 })
  
 /**
  * Make an API call and fill a <div id="post-info">
  * with the response data
  */
 $.ajax({
   url: "https://jsonplaceholder.typicode.com/posts/33",
   success: (result) => {
     $("#post-info").html(
       "<strong>" + result.title + "</strong>" + result.body
     )
   },
 })