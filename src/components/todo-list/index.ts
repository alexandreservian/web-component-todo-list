class TodoList extends HTMLElement {
  private root: ShadowRoot;
  private $form: HTMLFormElement | null = null;
  private $input: HTMLInputElement | null = null;
  private $ul: HTMLUListElement | null = null;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    const template: string = `
      <style>
        :host {
					display: flex;
					height: 100%;
					width: 100%;
					justify-content: center;
					align-items: center;
        }
				.container{
					background: #fff;
					border-radius: 3px;
					box-shadow: 0 4px 29px rgb(0 0 0 / 10%);
					display: flex;
    			flex-direction: column;
					padding: 25px;
					width: 350px;
					height: 500px;
				}
				h1 {
					text-align: center;
					font-size: 1.7em;
					margin: 0;
				}
				form{
					display: flex;
					padding: 20px 0 0 0;
					margin: 0;
				}
				input{
					border: 1px solid #cccccc;
					border-radius: 4px;
					outline-color: #2984fd;
					flex: 1;
					height: 36px;
					margin: 0 5px 0 0;
					padding: 0 5px;
				}
				button {
					border: none;
					color: #fff;
					cursor: pointer;
					font-weight: bold;
					border-radius: 4px;
				}
				.button-add {
					background: #3cbc9c;
					width: 45px;
				}
				.button-add:hover {
					background: #32a085;
				}
				ul {
					margin: 20px 0 0 0;
					padding: 0;
					height: 100%;
					list-style: none;
					overflow-y: auto;
				}
				li{
					display: flex;
					padding: 8px 0;
				}
				p {
					margin: 0 5px 0 0;
					flex: 1;
				}
				.button-remove {
					background: #E74C3C;
					height: 18px;
				}
				.button-remove:hover {
					background: #C0392B;
				}
      </style>
      <div class="container">
        <h1>${this.title}</h1>
				<form>
					<input type="text" name="anotation" />
					<button class="button-add" type="submit">Add</button>
				</form>
				<ul></ul>
      </div>
    `;
    this.root.innerHTML = template;
    this.$form = this.root.querySelector('form');
    this.$input = this.root.querySelector('input');
    this.$ul = this.root.querySelector('ul');
    this.$form?.addEventListener('submit', this.handleOnSubmit);
  }

  disconnectedCallback(): void {
    this.$form?.removeEventListener('submit', this.handleOnSubmit);
  }

  private createItemList(value: string): HTMLLIElement {
    const $item = document.createElement('li');
    $item.innerHTML = `
			<p>${value}</p><button class="button-remove" type="click">Delete</button>
		`;
    const $buttonDelete = $item.querySelector('button');
    $buttonDelete?.addEventListener('click', () => $item.remove());

    return $item;
  }

  private handleOnSubmit = (e: Event): void => {
    e.preventDefault();
    if (this.value.trim()) {
      const li = this.createItemList(this.value);
      this.$ul?.appendChild(li);
      this.value = '';
    }
  };

  get value(): string {
    return this.$input?.value || '';
  }

  set value(newValue: string) {
    if (!this.$input) return;
    this.$input.value = newValue;
  }

  get title(): string {
    return this.getAttribute('title') || '';
  }
}

export default TodoList;
