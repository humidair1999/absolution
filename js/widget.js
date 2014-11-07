var Widget = function($element) {
    this.id = Math.random().toString(36).substr(2, 6);

    this.$el = $element;
    this.edges = {};

    this.initialize();
};

Widget.prototype.initialize = function() {
    console.log(this);

    this.setAbsolutePosition();

    this.setPosition();

    this.calculateEdges();
};

Widget.prototype.setPosition = function() {
    var position = this.$el.attr('data-absolution-pos'),
        xPos = null,
        yPos = null;

    if (!position) {
        console.warn('no positioning coordinates specified for widget:', this.id);

        xPos = 0;
        yPos = 0;
    }
    else {
        xPos = position.split(',')[0];
        yPos = position.split(',')[1];
    }
    
    this.$el.css({
        'top': xPos + 'px',
        'left': yPos + 'px'
    });
};

Widget.prototype.setAbsolutePosition = function() {
    this.$el.css({
        'position': 'absolute'
    });
};

Widget.prototype.calculateEdges = function() {
    this.edges.top = this.$el.position().top;
    this.edges.bottom = this.$el.outerHeight() + this.$el.position().top;
    this.edges.left = this.$el.position().left;
    this.edges.right = this.$el.outerWidth() + this.$el.position().left;
};