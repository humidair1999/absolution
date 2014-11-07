var App = function() {
    this.id = Math.random().toString(36).substr(2, 6);

    this.containerSelector = '[data-absolution-element="container"]';
    this.containers = [];

    this.initialize();
};

App.prototype.initialize = function() {
    console.log(this);

    this.createContainers();
};

App.prototype.createContainers = function() {
    var that = this;

    $(this.containerSelector).each(function(idx, el) {
        that.containers.push(new Container($(el)));
    });
};