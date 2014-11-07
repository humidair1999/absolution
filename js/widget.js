var Widget = function($element) {
    this.id = Math.random().toString(36).substr(2, 6);

    this.$el = $element;
    this.edges = {};
    this.layer = null;

    this.initialize();
};

Widget.prototype.initialize = function() {
    console.log(this);

    this.setWidgetId();
    this.setAbsolutePosition();

    this.setPosition();
    this.setSize();
    this.setLayer();

    this.calculateEdges();
};

Widget.prototype.setWidgetId = function() {
    this.$el.attr('data-absolution-id', this.id);
};

Widget.prototype.setAbsolutePosition = function() {
    this.$el.css({
        'position': 'absolute'
    });
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

Widget.prototype.setSize = function() {
    var size = this.$el.attr('data-absolution-size'),
        width = null,
        height = null;

    if (!size) {
        console.warn('no sizing values specified for widget:', this.id);
    }
    else {
        width = size.split(',')[0];
        height = size.split(',')[1];

        this.$el.css({
            'width': width + 'px',
            'height': height + 'px'
        });
    }
};

Widget.prototype.setLayer = function() {
    var layer = parseInt(this.$el.attr('data-absolution-layer'), 10),
        zIndex = null;

    if (!layer || (layer < 1) || (layer > 4)) {
        console.warn('invalid layer specified for widget:', this.id);

        zIndex = 4;
    }
    else {    
        switch (layer) {
            case (1):
                zIndex = 4;

                break;
            case (2):
                zIndex = 3;

                break;
            case (3):
                zIndex = 2;

                break;
            case (4):
                zIndex = 1;

                break;
        }
    }

    this.$el.css({
        'z-index': zIndex
    });
};

Widget.prototype.calculateEdges = function() {
    this.edges.top = this.$el.position().top;
    this.edges.bottom = this.$el.outerHeight() + this.$el.position().top;
    this.edges.left = this.$el.position().left;
    this.edges.right = this.$el.outerWidth() + this.$el.position().left;
};