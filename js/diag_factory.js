const NORM_VEC_X_IDX = 2;
const NORM_VEC_Y_IDX = 3;

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

function diag_db(x, y, width, height) {
    const items = [];
    const hw = width / 2;
    const hh = height / 2;

    items.push(create_data_top(x - hw, y - hh, width, height));
    items.push(create_flexible_band(x - hw, y - hh, width, height, 0));

    items.push(svg_circle(x, y, 5, {'fill':'red'}));
    return items;
}

function diag_object_store(x, y, width, height) {
    const items = [];
    const hw = width / 2;
    const hh = height / 2;

    items.push(create_data_top(x - hw, y - hh, width, height));
    items.push(create_flexible_band(x - hw, y - hh, width, height, 25));

    items.push(svg_circle(x, y, 5, {'fill':'red'}));
    return items;
}

function diag_file_store(x, y, width, height) {
    const items = [];
    const tri_height = height / 3;
    const hw = width / 2;
    const y_off = (1.5 * tri_height) + 7;

    items.push(create_data_top(x - hw, y - y_off, width, height));
    items.push(create_flexible_band(x - hw, y - y_off, width, tri_height, 0));
    items.push(create_flexible_band(x - hw, y + tri_height + 5 - y_off, width, tri_height, 0));
    items.push(create_flexible_band(x - hw, (y + 2 * tri_height) + 10 - y_off, width, tri_height, 0));

    items.push(svg_circle(x, y, 5, {'fill':'red'}));
    return items;
}

function diag_message_store(x, y, width, height, opts) {
    const items = [];
    const tri_width = width / 3;
    const hh = height / 2;

    const unit_width = (!opts.has('unit_width')) ? 40 : opts.get('unit_width');
    const offset = (!opts.has('offset') || opts.get('offset') < 1) ? 1 : opts.get('offset');
    const bands = (!opts.has('bands') || opts.get('bands') < 3) ? 3 : opts.get('bands');
    const adj_w = - offset - 4;

    const x_off = 2 * unit_width;

    var tf_str = 'translate(' + x_off.toString() + ', ' + (-hh).toString() + ')';
    const message_store_group = svg_group({'transform':tf_str});
    items.push(message_store_group);

    message_store_group.appendChild(create_side_cover(x, y, height, opts));

    for (var i = 0;i < bands; ++i) {
        message_store_group.appendChild(create_side_band((x - unit_width * i) + (4 * i) + (i * adj_w), y, width, height, 0, unit_width));
    }

    items.push(svg_circle(x, y, 5, {'fill':'red'}));

    return items;
}

function diag_gear(x, y, width, height) {
    const items = [];

    var tf_str = 'translate(' + x.toString() + ', ' + y.toString() + ') scale(2, 2)';
    const gear_group = svg_group({'transform':tf_str, 'stroke-width':'1'});
    items.push(gear_group);

    const circle_attribs = {};
    circle_attribs['stroke']="black";
    circle_attribs['stroke-width']="10";
    circle_attribs['fill']="none";

    gear_group.appendChild(svg_circle(0, 0, 40, circle_attribs));
    
    var path_d = "m0,-43 l-10,0 l3,-10 l14,0 l3,10 z";
    gear_group.appendChild(svg_path(path_d));

    for (var i = 1;i < 8; ++i) {
        const angle_in_deg = 45 * i;
        tf_str = 'rotate(' + angle_in_deg.toString() + ', 0, 0)';
        gear_group.appendChild(svg_path(path_d, {'transform':tf_str}));
    }

    items.push(svg_circle(x, y, 5, {'fill':'red'}));

    return items;
}

function diag_transform(x, y, width, height) {
    const items = [];
    const item_size = 3;
    const line_width = (item_size * 4).toString();

    const circle_attribs = {};
    circle_attribs['stroke']="red";
    circle_attribs['stroke-width']="1";
    circle_attribs['fill']="none";
    
    var tf_str = 'translate(' + x.toString() + ', ' + y.toString() + ') scale(2, 2)';
    const transform_group = svg_group({'transform':tf_str, 'stroke':'black', 'fill':'none', "stroke-width":line_width});
    items.push(transform_group);

    const alpha_offset = 12;

    const start_angle = -(90 - alpha_offset);
    const end_angle = 30 - alpha_offset;

    const start_x = point_on_circle_x(width, start_angle);
    const start_y = point_on_circle_y(width, start_angle);

    const arc_mid_x = point_on_circle_x(width, -30);
    const arc_mid_y = point_on_circle_y(width, -30);

    const end_x = point_on_circle_x(width, end_angle);
    const end_y = point_on_circle_y(width, end_angle);

    const mid_x = (end_x + start_x) / 2.0;
    const mid_y = (end_y + start_y) / 2.0;

    const mid_circle_vec = vector_from_points(0, 0, arc_mid_x, arc_mid_y);
    const seg_to_mid_length = Math.sqrt(Math.pow(mid_x - arc_mid_x, 2) + Math.pow(mid_y - arc_mid_y, 2));

    const stretch_factor = 1.85;

    const compare_x = mid_x + (mid_circle_vec[NORM_VEC_X_IDX] * seg_to_mid_length * stretch_factor);
    const compare_y = mid_y + (mid_circle_vec[NORM_VEC_Y_IDX] * seg_to_mid_length * stretch_factor);

    var path_d = "M" + start_x + "," + start_y + " Q" + compare_x + "," + compare_y + " " + end_x + "," + end_y;
    transform_group.appendChild(svg_path(path_d));
    transform_group.appendChild(svg_path(path_d, {'transform':"rotate(-120, 0, 0)"}));
    transform_group.appendChild(svg_path(path_d, {'transform':"rotate(-240, 0, 0)"}));

    const tri_scale = 2.7 * item_size;

    const triangle_vec_l = vector_from_points(end_x, end_y, 0, 0);
    const tri_x_l = end_x + (triangle_vec_l[NORM_VEC_X_IDX] * tri_scale);
    const tri_y_l = end_y + (triangle_vec_l[NORM_VEC_Y_IDX] * tri_scale);

    const triangle_vec_r = vector_from_points(0, 0, end_x, end_y);
    const tri_x_r = end_x + (triangle_vec_r[NORM_VEC_X_IDX] * tri_scale);
    const tri_y_r = end_y + (triangle_vec_r[NORM_VEC_Y_IDX] * tri_scale);

    const point_x = end_x + 0 + (triangle_vec_r[NORM_VEC_Y_IDX] * tri_scale);
    const point_y = end_y + 0 + (-triangle_vec_r[NORM_VEC_X_IDX] * tri_scale);
    
    const size_sf_str = (item_size * 1.3).toString();

    path_d = "M " + tri_x_l + "," + tri_y_l + " L" + tri_x_r + "," + tri_y_r + " L" + point_x + "," + point_y + " z";
    transform_group.appendChild(svg_path(path_d, {"stroke-width": size_sf_str, 'fill':'black'}));
    
    path_d = "M " + tri_x_l + "," + tri_y_l + " L" + tri_x_r + "," + tri_y_r + " L" + point_x + "," + point_y + " z";
    transform_group.appendChild(svg_path(path_d, {"stroke-width": size_sf_str, 'fill':'black', 'transform':"rotate(-120, 0, 0)"}));
    
    path_d = "M " + tri_x_l + "," + tri_y_l + " L" + tri_x_r + "," + tri_y_r + " L" + point_x + "," + point_y + " z";
    transform_group.appendChild(svg_path(path_d, {"stroke-width": size_sf_str, 'fill':'black', 'transform':"rotate(-240, 0, 0)"}));

    items.push(svg_circle(x, y, 5, {'fill':'red'}));
    return items;
}
