/**
 * Copyright 2026 cjh6976-prog
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.counter = 0;
    this.min = 0;
    this.max = 30;
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
    });

  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      counter: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);

      }
      :host([counter="18"]) h3 {
        color: var(--ddd-theme-default-keystoneYellow);
      }
      :host([counter="21"]) h3 {
        color: var(--ddd-theme-default-keystoneYellow);
      }
      .counter-label {
        font-size: var(--ddd-font-size-xxl, 70px);
      }
      :host([counter]) h3.min{
        color: var(--ddd-theme-default-error);
      }
      :host([counter]) h3.max {
        color: var(--ddd-theme-default-success);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      button:hover {
        background-color: var(--ddd-theme-default-keystoneYellow);
        color: pink;
      }
      button:focus {
        outline: 4px solid var(--ddd-theme-default-keystoneYellow);
        outline-offset: 4px
      }
      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <confetti-container id="confetti">
  <h3 
  class="counter-label 
  ${this.counter === this.min ? "min" : ""}
  ${this.counter === this.max ? "max" : ""}">
  <span>Counter:</span> 
  ${this.counter}</h3>
  <button @click="${this.decrement}"
  ?disabled="${this.counter === this.min}">-</button>
  <button @click="${this.increment}" 
  ?disabled="${this.counter === this.max}">+</button>
  <slot></slot>
  </confetti-container>
</div>`;
  }

  /**
 * Increment the counter value
 */
    updated(changedProperties) {
      if (super.updated) {
        super.updated(changedProperties);
      }
      if (changedProperties.has("counter") && this.counter === 21) {
        this.makeItRain();
      }
    }
// This will trigger confetti when the counter reaches 21.
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js")
    .then(() => {
        setTimeout(() => {
          this.shadowRoot
          .querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      });
  }

  // This will make sure that the counter doesn't exceed the max value, which is 30.

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }   
  // This makes sure that the counter doesn't go below the min value, which is 0.
  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }
  
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);