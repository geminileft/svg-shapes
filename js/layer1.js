function create_data_top(x, y, width, height) {
    const w = width.toString();
    const hw = (width / 2).toString();
    const offset = -5;
    const y_adjusted = parseInt(y) + offset;
    const top_d = 'm' + x + ',' + y_adjusted.toString() + ' a' + hw +
    ',20 0 1,0 ' + w + ',0a' + hw + ',20 0 0,0 -' + w + ',0';
    return svg_path(top_d);
}
