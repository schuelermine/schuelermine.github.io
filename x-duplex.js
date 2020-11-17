class DuplexDiv extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const α = this.attachShadow({mode: "open"});

        const τ = document.createElement("slot");
        const ν = document.createElement("div");
        α.append(τ, ν);
        this.τ = τ
        this.ν = ν

        const λ = (_ω1, _ω2) => this.render();
        this.observer = new MutationObserver(λ);
        this.observer.observe(τ, {subtree: true, childList: true, attributes: true})

        console.log("DuplexDiv: connected");
    }

    disconnectedCallback() {
        console.log("DuplexDiv: disconnected");
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(_name, _oldvalue, _newvalue) {
        // pass
    }

    adoptedCallback() {
        console.log("DuplexDiv: adopted");
    }

    render() {
        this.ν.innerHTML = this.τ.innerHTML
    }
}

customElements.define("duplex-div", DuplexDiv)