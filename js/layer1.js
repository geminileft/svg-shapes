function create_data_top(x, y, width, height) {
    const w = width.toString();
    const hw = (width / 2).toString();
    const offset = -5;
    const y_adjusted = parseInt(y) + offset;
    const top_d = 'm' + x + ',' + y_adjusted.toString() + ' a' + hw +
    ',20 0 1,0 ' + w + ',0a' + hw + ',20 0 0,0 -' + w + ',0';
    return svg_path(top_d);
}

function create_flexible_band(x, y, width, height, slim) {
    const h = height.toString();
    const w = width.toString();
    const iwidth = parseInt(width);

    const nw = iwidth - (slim * 2);    
    const hnw = (nw / 2).toString();

    const hw = (iwidth / 2).toString();
    const narrow_slim = '-' + slim.toString();
    const narrow_width = '-' + (iwidth - (slim * 2)).toString();

    var _sw = (slim / 2).toString();
    if (slim == 0) {
        _sw = '20';
    }
    
    path_str = 'm' + x + ',' + y + ' a' + hw + ',20 0 1,0 ' + w +
    ',0 l' + narrow_slim + ',' + h + ' a' + hnw + ','+ _sw + ' 0 1,1 ' + narrow_width + ',0'
    return svg_path(path_str);
}

function create_side_cover(x, y, height, opts) {
    var offset = 1;
    if (opts.has('offset')) {
        offset = opts.get('offset');
    }

    const x_adjusted = parseInt(x) + offset;
    const pos = 'm' + x_adjusted.toString() + ',' + y.toString();
    const arc1 = gen_side_arc1c(height, false, false);
    const arc2 = gen_side_arc1c(height, false, true);
    const path_str = pos + ' ' + arc1 + ' ' + arc2;

    return svg_path(path_str);
}

function create_side_band(x, y, width, height, slim, unit_size) {
    const h = height.toString();
    const hh = (h / 2).toString();
    const us = unit_size.toString();

    const pos = 'm' + x + ',' + y;
    const arc1 = gen_side_arc1c(height, false, false);
    const line = 'l-' + us + ',0';
     const arc2 = gen_side_arc1c(height, true, true);
    path_str = pos + ' ' + arc1 + ' ' + line + ' ' + arc2;

    return svg_path(path_str);
}

function quad_bez_path(x1, y1, x2, y2, x3, y3) {
    const path = "M" + x1 + "," + y1 + " Q" + x2 + "," + y2 + " " + x3 + "," + y3;
    return path;
}
