function Preloader(el) {
    this.el = el;

    this.show = () => {
        this.el.style.display = 'block';
    };

    this.hide = () => {
        this.el.style.display = 'none';
    };
}


export default new Preloader(document.getElementById('preloader'));