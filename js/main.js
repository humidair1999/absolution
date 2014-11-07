// widget
var Widget = function($element) {
    this.id = Math.random().toString(36).substr(2, 6);

    this.$el = $element;
    this.edges = {};

    this.initialize();
};

Widget.prototype.initialize = function() {
    console.log(this);

    this.setAbsolutePosition();

    this.calculateEdges();
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

// container
var Container = function($element) {
    var that = this;

    this.id = Math.random().toString(36).substr(2, 6);

    this.$el = $element;
    this.metrics = {};

    this.widgetSelector = '[data-absolution-element="widget"]';
    this.widgets = [];

    this.initialize();
};

Container.prototype.initialize = function() {
    var that = this,
        fps = 20;

    console.log(this);

    this.setRelativePosition();

    this.calculateMetrics();

    (function draw() {
        setTimeout(function() {
            requestAnimFrame(draw);
            
            that.createWidgets();
        }, 1000 / fps);
    })();

    this.setMetrics();
};

Container.prototype.setRelativePosition = function() {
    this.$el.css({
        'position': 'relative'
    });
};

Container.prototype.createWidgets = function() {
    var that = this;

    // if the number of widgets found in the DOM differs from the number of widgets
    //  stored in the container object, rescan all widgets
    if (this.$el.find(this.widgetSelector).length !== this.widgets.length) {
        this.$el.find(this.widgetSelector).each(function(idx, el) {
            var shouldAddToCollection = true;

            // iterate through all existing container widgets
            for (var i = 0; i < that.widgets.length; i++) {
                // if the new element is any of the existing container widgets, we know
                //  not to add it to the collection
                if ($(el).is(that.widgets[i].$el)) {
                    shouldAddToCollection = false;
                }
            }

            if (shouldAddToCollection) {
                that.widgets.push(new Widget($(el)));
            }
        });

        this.setMetrics();
    }
    else {
        //console.warn('number of widgets has not changed; widget creation unnecessary!');
    }
};

Container.prototype.calculateMetrics = function() {
    this.metrics.width = this.$el.outerWidth();
    this.metrics.height = this.$el.outerHeight();

    console.log(this.metrics);
};

Container.prototype.setMetrics = function() {
    var newWidth = 0,
        newHeight = 0;

    for (var i = 0; i < this.widgets.length; i++) {
        if (this.widgets[i].edges.right > newWidth) {
            newWidth = this.widgets[i].edges.right;
        }

        if (this.widgets[i].edges.bottom > newHeight) {
            newHeight = this.widgets[i].edges.bottom;
        }
    }

    // set metrics of container according to positions of abs children
    this.$el.css({
        'width': newWidth ? newWidth + 2 : 'auto',
        'height': newHeight ? newHeight + 2 : 'auto'
    });

    this.calculateMetrics();
};

// app
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

var app = new App();

// $('[data-abs-element="container"]').append('<div class="abs debug" data-abs-element="widget" style="top: 200px; left: 0;">dsdjksns</div>');
// app.containers[0].createWidgets();