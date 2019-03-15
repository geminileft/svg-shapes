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
