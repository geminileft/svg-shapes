const NORM_VEC_X_IDX = 2;
const NORM_VEC_Y_IDX = 3;

const DIAG_TYPE_ATTR = 'data-diag-type';
const DIAG_INT_MODE_ATTR = 'data-diag-int-mode';
const DIAG_SHOW_BOUNDS = 'data-diag-show-bounds';

const DIAG_INTERACTIVE_NONE = 0;
const DIAG_INTERACTIVE_MOVE = 1;

const DIAG_ITEM_BG_RECT = {'fill':'green', 'stroke-width':'3', 'stroke':'red'};

const TRANSFORM_TRANSLATE_SCALE_VAL = 1;
const TRANSFORM_TRANSLATE_VAL = 2;
const TRANSFORM_SCALE_VAL = 3;

var active_item = null;
var elementX;
var elementY;
var elementScaleX;
var elementScaleY;

var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

function DataFlowDiagram(svg_context) {
    this.svg = svg_context;
    this.children = [];
    this.interactiveMode = DIAG_INTERACTIVE_NONE;
}

DataFlowDiagram.prototype.drawImmediateSingle = function(child) {
    child.setAttribute(DIAG_INT_MODE_ATTR, this.interactiveMode);
    if (this.interactiveMode) {
        for (var i = 0;i < child.childNodes.length; ++i) {
            var cn = child.childNodes[i];
            if (cn.hasAttribute(DIAG_SHOW_BOUNDS)) {
                cn.style.visibility = 'visible';
            }
        }
    }
    this.svg.appendChild(child);
    this.children.push(child);
}

DataFlowDiagram.prototype.drawImmediateMulti = function(children) {
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        this.drawImmediateSingle(child);
    }
}

DataFlowDiagram.prototype.setInteractiveMode = function(mode) {
    this.interactiveMode = mode;
    for (var child in this.children) {
        child.setAttribute(DIAG_INT_MODE_ATTR, this.interactiveMode);
    }
}

function diag_mousedown_handler(e) {
    const el = this;
    if (el.getAttribute(DIAG_INT_MODE_ATTR) == DIAG_INTERACTIVE_MOVE) {
        initialX = e.offsetX;
        initialY = e.offsetY;
        const dbstr = 'initial x: ' + initialX.toString() + ' y: ' + initialY.toString()
        active_item = el;
        const bv = active_item.transform.baseVal;
        for (var i = 0;i < bv.length; ++i) {
            var tf = bv[i];
            if (tf.type == TRANSFORM_TRANSLATE_VAL) {
                elementX = tf.matrix.e;
                elementY = tf.matrix.f;
            }
            else if (tf.type == TRANSFORM_SCALE_VAL) {
                elementScaleX = tf.matrix.a;
                elementScaleY = tf.matrix.d;
            }
            else if (tf.type == TRANSFORM_TRANSLATE_SCALE_VAL) {
                elementX = tf.matrix.e;
                elementY = tf.matrix.f;
                elementScaleX = tf.matrix.a;
                elementScaleY = tf.matrix.d;

            }
        }
        e.stopPropagation();    
    }
}

function diag_mouseup_handler(e) {
    const el = this;
    if (el.getAttribute(DIAG_INT_MODE_ATTR) == DIAG_INTERACTIVE_MOVE) {
        const finalX = e.offsetX;
        const finalY = e.offsetY;

        if (active_item != null) {
            const dbstr = 'final x: ' + finalX.toString() + ' y: ' + finalY.toString()
            const me_txt = el.getAttribute(DIAG_TYPE_ATTR);
        }
        active_item = null;
        e.stopPropagation();
    }
}

function diag_mousemove_handler(e) {
    const el = this;
    if (el.getAttribute(DIAG_INT_MODE_ATTR) == DIAG_INTERACTIVE_MOVE) {
        if (active_item != null) {
            const currentX = e.offsetX;
            const currentY = e.offsetY;
            const deltaX = currentX - initialX;
            const deltaY = currentY - initialY;
            const nX = (elementX + deltaX).toString();
            const nY = (elementY + deltaY).toString();
            const dbstr = 'move x: ' + nX.toString() + ' y: ' + nY.toString()
            // console.log(dbstr);
            el.setAttribute('transform', 'translate(' + nX + ', ' + nY + ')')
            const bv = active_item.transform.baseVal;
            for (var i = 0;i < bv.length; ++i) {
                var tf = bv[i];
                if (tf.type == TRANSFORM_TRANSLATE_VAL) {
                    tf.matrix.e = elementX + deltaX;
                    tf.matrix.f = elementY + deltaY;
                    break;
                }
            }
                e.stopPropagation();
        }
    }
}

function core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale) {

    const box_w = width * box_width_scale;
    const box_h = height * box_height_scale;

    const hbw = box_w / 2;
    const hbh = box_h / 2;

    const bounds_rect = svg_rect(- hbw, -hbh, box_w, box_h, DIAG_ITEM_BG_RECT);
    
    const s_factor = scale_factor || 1.0;
    var tf_str = 'translate(' + x + ', ' + y + ') scale(' + s_factor.toString() + ',' + s_factor.toString() + ')';
    const diag_group = svg_group({'transform':tf_str});
    diag_group.setAttribute(DIAG_TYPE_ATTR, diag_type);
    diag_group.addEventListener("mousedown", diag_mousedown_handler, false);
    diag_group.addEventListener("mouseup", diag_mouseup_handler, false);
    diag_group.addEventListener("mousemove", diag_mousemove_handler, false);
    bounds_rect.setAttribute(DIAG_SHOW_BOUNDS, false);
    bounds_rect.style.visibility = 'hidden';
    diag_group.appendChild(bounds_rect);
    return diag_group;
}

function diag_db(x, y, scale_factor) {
    const items = [];

    const width = 150;
    const height = 100;

    const box_width_scale = 1;
    const box_height_scale = 1.5;

    const diag_type = 'database';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const hw = width / 2;
    const hh = height / 2;

    diag_group.appendChild(create_data_top(- hw, -hh, width, height));
    diag_group.appendChild(create_flexible_band(- hw, -hh, width, height, 0));
    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));
    return items;
}

function diag_object_store(x, y, scale_factor) {
    const items = [];

    const width = 150;
    const height = 100;

    const box_width_scale = 1;
    const box_height_scale = 1.5;
    
    const diag_type = 'object_store';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const hw = width / 2;
    const hh = height / 2;

    diag_group.appendChild(create_data_top(- hw, - hh, width, height));
    diag_group.appendChild(create_flexible_band(- hw, - hh, width, height, 25));
    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));
    return items;
}

function diag_file_store(x, y, scale_factor) {
    const items = [];

    const width = 150;
    const height = 100;

    const box_width_scale = 1;
    const box_height_scale = 1.6;

    const diag_type = 'file_store';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const tri_height = height / 3;
    const hw = width / 2;
    const y_off = (1.5 * tri_height) + 7;

    diag_group.appendChild(create_data_top(- hw, - y_off, width, height));
    diag_group.appendChild(create_flexible_band(- hw, - y_off, width, tri_height, 0));
    diag_group.appendChild(create_flexible_band(- hw, tri_height + 5 - y_off, width, tri_height, 0));
    diag_group.appendChild(create_flexible_band(- hw, (2 * tri_height) + 10 - y_off, width, tri_height, 0));
    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));
    return items;
}

function diag_message_store(x, y, scale_factor) {
    const items = [];

    const opts = new Map();
    opts.set('offset', 3);
    opts.set('bands', 4);
    
    const width = 150;
    const height = 70;

    const box_width_scale = 1.6;
    const box_height_scale = 1;

    const diag_type = 'message_store';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const hh = height / 2;

    const unit_width = (!opts.has('unit_width')) ? 40 : opts.get('unit_width');
    const offset = (!opts.has('offset') || opts.get('offset') < 1) ? 1 : opts.get('offset');
    const bands = (!opts.has('bands') || opts.get('bands') < 3) ? 3 : opts.get('bands');
    const adj_w = - offset - 4;

    const x_off = 2 * unit_width;

    diag_group.appendChild(create_side_cover(0 + x_off, 0 - hh, height, opts));

    for (var i = 0;i < bands; ++i) {
        diag_group.appendChild(create_side_band((x_off - unit_width * i) + (4 * i) + (i * adj_w), -hh, width, height, 0, unit_width));
    }

    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));

    return items;
}

function diag_gear(x, y, scale_factor) {
    const items = [];

    const width = 150;
    const height = 100;

    const box_width_scale = .75;
    const box_height_scale = 1.1;


    const diag_type = 'gear';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const circle_attribs = {};
    circle_attribs['stroke']="black";
    circle_attribs['stroke-width']="10";
    circle_attribs['fill']="none";

    diag_group.appendChild(svg_circle(0, 0, 40, circle_attribs));
    
    var path_d = "m0,-43 l-10,0 l3,-10 l14,0 l3,10 z";
    diag_group.appendChild(svg_path(path_d));

    for (var i = 1;i < 8; ++i) {
        const angle_in_deg = 45 * i;
        tf_str = 'rotate(' + angle_in_deg.toString() + ', 0, 0)';
        diag_group.appendChild(svg_path(path_d, {'transform':tf_str}));
    }

    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));

    return items;
}

function diag_transform(x, y, scale_factor) {
    const items = [];

    const width = 40;
    const height = 100;

    const box_width_scale = 2.5;
    const box_height_scale = 1.1;

    const diag_type = 'transform';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const item_size = 3;
    const line_width = (item_size * 4).toString();

    const circle_attribs = {};
    circle_attribs['stroke']="red";
    circle_attribs['stroke-width']="1";
    circle_attribs['fill']="none";

    const alpha_offset = 12;

    const start_angle = -(90 - alpha_offset);
    const end_angle = 30 - alpha_offset;

    const [start_x, start_y, arc_mid_x, arc_mid_y, end_x, end_y] =
        circle_points(width, start_angle, end_angle);

    const mid_x = (end_x + start_x) / 2.0;
    const mid_y = (end_y + start_y) / 2.0;

    const mid_circle_vec = vector_from_points(0, 0, arc_mid_x, arc_mid_y);
    const seg_to_mid_length = Math.sqrt(Math.pow(mid_x - arc_mid_x, 2) + Math.pow(mid_y - arc_mid_y, 2));

    const stretch_factor = 1.85;

    const compare_x = mid_x + (mid_circle_vec[NORM_VEC_X_IDX] * seg_to_mid_length * stretch_factor);
    const compare_y = mid_y + (mid_circle_vec[NORM_VEC_Y_IDX] * seg_to_mid_length * stretch_factor);

    var path_d = quad_bez_path(start_x, start_y, compare_x, compare_y, end_x, end_y);

    diag_group.appendChild(svg_path(path_d, {'fill':'none', 'stroke':'black', "stroke-width":line_width}));
    diag_group.appendChild(svg_path(path_d, {'transform':"rotate(-120, 0, 0)", 'stroke':'black', 'fill':'none', "stroke-width":line_width}));
    diag_group.appendChild(svg_path(path_d, {'transform':"rotate(-240, 0, 0)", 'stroke':'black', 'fill':'none', "stroke-width":line_width}));

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
    diag_group.appendChild(svg_path(path_d, {"stroke-width": size_sf_str, 'stroke':'black', 'fill':'black'}));
    
    path_d = "M " + tri_x_l + "," + tri_y_l + " L" + tri_x_r + "," + tri_y_r + " L" + point_x + "," + point_y + " z";
    diag_group.appendChild(svg_path(path_d, {"stroke-width": size_sf_str, 'stroke':'black', 'fill':'black', 'transform':"rotate(-120, 0, 0)"}));
    
    path_d = "M " + tri_x_l + "," + tri_y_l + " L" + tri_x_r + "," + tri_y_r + " L" + point_x + "," + point_y + " z";
    diag_group.appendChild(svg_path(path_d, {"stroke-width": size_sf_str, 'stroke':'black', 'fill':'black', 'transform':"rotate(-240, 0, 0)"}));

    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));
    return items;
}

function diag_server(x, y, scale_factor) {
    const items = [];

    const width = 100;
    const height = 150;

    const box_width_scale = 1.1;
    const box_height_scale = 1.1;

    const diag_type = 'server';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const hw = width / 2;
    const hh = height / 2;

    const x_off = 11;
    const y_start = 13;
    const drive_height_pctg = .07;
    const drive_off_pctg = .021;

    const drive_x = - hw + x_off;
    const drive_y = -hh + y_start;
    const drive_width = width - (x_off * 2);
    const drive_height = height * drive_height_pctg;

    var drive_color = 'white';
    var server_fill = 'black';

    if (true) {
        drive_color = 'black';
        server_fill = 'none';
    }

    const drive_attribs = {'rx':'2', 'ry':'2', 'fill':drive_color};

    const chassis_attr = {'rx':'5', 'ry':'5', 'stroke':'black', 'fill':server_fill, "stroke-width":5};
    diag_group.appendChild(svg_rect(- hw, -hh, width, height, chassis_attr));
    diag_group.appendChild(svg_rect(drive_x, drive_y, drive_width, drive_height, drive_attribs));
    diag_group.appendChild(svg_rect(drive_x, drive_y + drive_height + (height * drive_off_pctg), drive_width, drive_height, drive_attribs));
    diag_group.appendChild(svg_rect(drive_x, drive_y + (2 * (drive_height + (height * drive_off_pctg))), drive_width, drive_height, drive_attribs));

    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));
    return items;
}

function diag_flatfile(x, y, scale_factor) {
    const items = [];

    const width = 100;
    const height = 150;

    const box_width_scale = 1.1;
    const box_height_scale = .9;

    const diag_type = 'flatfile';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const x_scale = 8.5;
    const y_scale = 11;

    const sc = 6;

    const n_off = x_scale * 3.5;

    const lx = (-x_scale * sc).toString();
    const nrx = ((x_scale * sc) - n_off).toString();
    const rx = (x_scale * sc).toString();

    const qy = ((-y_scale * sc) + n_off).toString();

    const ty = (-y_scale * sc).toString();
    const by = (y_scale * sc).toString();
    
    const poly_pts = lx + ", " + ty + " " + nrx + ", " + ty + " " + rx + ", " + qy + " " + rx + ", " + by + " " + lx + ", " + by;
    diag_group.appendChild(svg_polygon(poly_pts));

    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));
    return items;
}

function diag_report(x, y, scale_factor) {
    const items = [];

    const width = 150;
    const height = 100;

    const box_width_scale = 1.05;
    const box_height_scale = 1.4;

    const diag_type = 'report';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const rpt_attribs = {'rx':'5', 'ry':'5', 'fill':'none', 'stroke':'black', 'stroke-width':'5'};

    const hw = width / 2;
    const hh = height / 2;
    const sc_off = 15;
    const sc_base_w = 20; //width of the screen base

    diag_group.appendChild(svg_rect(- hw, -hh - sc_off, width, height - sc_off, rpt_attribs));

    diag_group.appendChild(svg_line(0, sc_off + 5, 0, hh, 'black', {'stroke-width':'5'}))
    diag_group.appendChild(svg_line(-sc_base_w, hh, sc_base_w, hh, 'black', {'stroke-width':'5'}))

    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));
    return items;
}

function diag_screen(x, y, scale_factor) {
    const items = [];

    const width = 150;
    const height = 100;

    const box_width_scale = 1.05;
    const box_height_scale = 1.4;

    const diag_type = 'screen';
    const diag_group = core_diag_grouping2(x, y, scale_factor, diag_type, width, height, box_width_scale, box_height_scale)
    items.push(diag_group);

    const hw = width / 2;
    const hh = height / 2;
    const sc_off = 15;
    const sc_base_w = 25; //width of the screen base
    const rpt_attribs = {'rx':'5', 'ry':'5', 'fill':'none', 'stroke':'black', 'stroke-width':'5'};

    diag_group.appendChild(svg_rect(- hw, -hh - sc_off, width, height - sc_off, rpt_attribs));

    const b_neck_w = sc_base_w / 3.5; //base neck width

    var path_d = quad_bez_path(-b_neck_w, sc_off + 5, -b_neck_w, hh, -sc_base_w, hh);
    path_d = path_d + ' l' + (sc_base_w * 2).toString() + ',0'
    path_d = path_d + ' Q' + b_neck_w + ',' + hh + ' ' + b_neck_w + ',' + (sc_off + 5).toString()
    diag_group.appendChild(svg_path(path_d, {'stroke-width':'5', 'stroke':'black', 'fill':'black', 'stroke-linecap':'round'}));

    diag_group.appendChild(svg_circle(0, 0, 5, {'fill':'blue'}));
    return items;
}
