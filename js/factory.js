function DataFlowDiagram(svg_context) {
    this.svg = svg_context;
    this.children = [];
}

DataFlowDiagram.prototype.appendSingle = function(child) {
    this.children.push(child);
}

DataFlowDiagram.prototype.appendMulti = function(children) {
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        this.appendSingle(child);
    }
}

DataFlowDiagram.prototype.render = function() {
    for(i = 0; i < this.children.length; i++) {
        child = this.children[i];
        this.svg.appendChild(child);
    }
}

function create_db(x, y, width, height) {
    const items = [];
    items.push(create_data_top(x, y, width, height));
    items.push(create_flexible_band(x, y, width, height, 0));
    return items;
}

function create_object_store(x, y, width, height) {
    const items = [];
    items.push(create_data_top(x, y, width, height));
    items.push(create_flexible_band(x, y, width, height, 25));
    return items;
}

function create_file_store(x, y, width, height) {
    const items = [];
    items.push(create_data_top(x, y, width, height));
    const tri_height = height / 3;
    items.push(create_flexible_band(x, y, width, tri_height, 0));
    items.push(create_flexible_band(x, y + tri_height + 5, width, tri_height, 0));
    items.push(create_flexible_band(x, (y + 2 * tri_height) + 10, width, tri_height, 0));
    return items;
}

function create_message_store(x, y, width, height, opts) {
    const items = [];

    const offset = (!opts.has('offset') || opts.get('offset') < 1) ? 1 : opts.get('offset');
    const adj_w = 6 - offset;

    items.push(create_side_cover(x, y, height, opts));
    const tri_width = width / 3;
    items.push(create_side_band(x, y, width, height, 0, 40));
    items.push(create_side_band(x - tri_width + 4 + adj_w, y, width, height, 0, 40));
    items.push(create_side_band((x - tri_width * 2) + 8 + (2 * adj_w), y, width, height, 0, 40));
    return items;
}
