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
        fps = 1;

    console.log(this);

    this.setContainerId();
    this.setRelativePosition();

    (function draw() {
        setTimeout(function() {
            requestAnimFrame(draw);
            
            that.createWidgets();

            that.checkWidgetCollisions();
        }, 1000 / fps);
    })();

    this.setMetrics();
};

Container.prototype.setContainerId = function() {
    this.$el.attr('data-absolution-id', this.id);
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

Container.prototype.checkWidgetCollisions = function() {
    var that = this,
        layerWidgets = {};

    var findWidgetsByLayer = function(layerNum) {
        return $.grep(that.widgets, function(element, idx) {
            return element.layer === layerNum;
        });
    };

    for (var i = 1; i <= 4; i++) {
        layerWidgets[i] = findWidgetsByLayer(i);
    }

    $.each(layerWidgets, function(prop, val) {
        var previousWidget = null;

        if (val.length > 1) {
            $.each(val, function(idx, val) {
                // console.log(val);
            })
        }
    });
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