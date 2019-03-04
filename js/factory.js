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
    const tri_width = width / 3;
    const unit_width = (!opts.has('unit_width')) ? 40 : opts.get('unit_width');
    const offset = (!opts.has('offset') || opts.get('offset') < 1) ? 1 : opts.get('offset');
    const bands = (!opts.has('bands') || opts.get('bands') < 3) ? 3 : opts.get('bands');
    const adj_w = - offset - 4;

    items.push(create_side_cover(x, y, height, opts));

    for (var i = 0;i < bands; ++i) {
        items.push(create_side_band((x - unit_width * i) + (4 * i) + (i * adj_w), y, width, height, 0, unit_width));
    }
    return items;
}

function create_gear(x, y, width, height) {
    const items = [];

    const circle_attribs = {};
    circle_attribs['stroke']="black";
    circle_attribs['stroke-width']="10";
    circle_attribs['fill']="none";

    items.push(create_circle(x, y, 40, circle_attribs));

    var tf_str = 'translate(' + x.toString() + ', ' + y.toString() + ')';
    const gear_group = svg_group({'transform':tf_str}, {'stroke-width':'1'});
    items.push(gear_group);
    
    var path_d = "m0,-43 l-10,0 l3,-10 l14,0 l3,10 z";
    gear_group.appendChild(svg_path(path_d));

    for (var i = 1;i < 8; ++i) {
        const angle_in_deg = 45 * i;
        tf_str = 'rotate(' + angle_in_deg.toString() + ', 0, 0)';
        gear_group.appendChild(svg_path(path_d, {'transform':tf_str}));
    }
    return items;
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function create_transform(x, y, width, height) {
    const items = [];

    const circle_attribs = {};
    circle_attribs['stroke']="red";
    circle_attribs['stroke-width']="3";
    circle_attribs['fill']="none";

    items.push(create_circle(x, y, width, circle_attribs));
    var tf_str = 'translate(' + x.toString() + ', ' + y.toString() + ')';
    const transform_group = svg_group({'transform':tf_str, 'stroke':'green', 'fill':'none', "stroke-width":"5"});
    items.push(transform_group);

    const alpha_offset = 10;

    const start_x = (width * Math.cos(toRadians(-(90 - alpha_offset)))).toString();
    const start_y = (width * Math.sin(toRadians(-(90 - alpha_offset))) * -1).toString();

    const mid_x = (width * Math.cos(toRadians(-30))).toString();
    const mid_y = (width * Math.sin(toRadians(-30)) * -1).toString();

    const end_x = (width * Math.cos(toRadians(30 - alpha_offset))).toString();
    const end_y = (width * Math.sin(toRadians(30 - alpha_offset)) * -1).toString();

    var path_d = "M" + start_x + "," + start_y + " Q" + mid_x + "," + mid_y + " " + end_x + "," + end_y;
    transform_group.appendChild(svg_path(path_d));
    transform_group.appendChild(svg_path(path_d, {'transform':"rotate(-120, 0, 0)"}));
    transform_group.appendChild(svg_path(path_d, {'transform':"rotate(-240, 0, 0)"}));
    //     <path d="M6.94,39.39 Q34.64,20 37.58,-13.68" stroke="red" fill="none" /> 

    return items;
}
