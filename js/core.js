function create_data_top(x, y, width, height) {
    const w = width.toString();
    const hw = (width / 2).toString();
    const offset = -5;
    const y_adjusted = parseInt(y) + offset;
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    element.setAttribute('d', 'm' + x + ',' + y_adjusted.toString() + ' a' + hw +
        ',20 0 1,0 ' + w + ',0a' + hw + ',20 0 0,0 -' + w + ',0');
    return element;
}

function gen_side_arc1(height) {
    const h = height.toString();
    const hh = (height / 2).toString();
    const arc1 = 'a15,' + hh + ' 0 1,0 0,' + h;
    return arc1;
}

function create_side_cover(x, y, width, height) {
    const w = width.toString();
    const hw = (width / 2).toString();
    const h = height.toString();
    const hh = (height / 2).toString();
    const offset = 1;
    const x_adjusted = parseInt(x) + offset;
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pos = 'm' + x_adjusted.toString() + ',' + y.toString();
    const arc1 = gen_side_arc1(height);
    // const arc1 = 'a10,' + hh + ' 0 1,0 0,' + h;
    const arc2 = 'a10,' + hh + ' 0 1,0 0,-' + h;
    const path_str = pos + ' ' + arc1 + ' ' + arc2;
    element.setAttribute('d', path_str);
    // element.setAttribute('d', pos + ' ' + arc1 + ' ' + arc2);
    return element;
}

function create_side_band(x, y, width, height, slim, unit_size) {
    const h = height.toString();
    const hh = (h / 2).toString();
    const us = unit_size.toString();

    var element = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const pos = 'm' + x + ',' + y;
    const arc1 = gen_side_arc1(height);
    const line = 'l-' + us + ',0';
    const arc2 = 'a10,' + hh + ' 0 1,1 0,-' + h;
    path_str = pos + ' ' + arc1 + ' ' + line + ' ' + arc2;
    element.setAttribute('d', path_str);
    return element;
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
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    var _sw = (slim / 2).toString();
    if (slim == 0) {
        _sw = '20';
    }
    
    path_str = 'm' + x + ',' + y + ' a' + hw + ',20 0 1,0 ' + w +
    ',0 l' + narrow_slim + ',' + h + ' a' + hnw + ','+ _sw + ' 0 1,1 ' + narrow_width + ',0'
    element.setAttribute('d', path_str);
    return element;
}


function create_ellipse() {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    element.setAttribute('cx', '100');
    element.setAttribute('cy', '50');
    element.setAttribute('rx', '100');
    element.setAttribute('ry', '20');
    return element;
}

function create_text() {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    element.setAttribute('x', '210');
    element.setAttribute('y', '250');
    element.setAttribute('font-size', '30');
    element.setAttribute('font-family', 'Verdana');
    element.setAttribute('fill', '#000000');
    var txt = document.createTextNode("/123456789012345678901234567890");
    element.appendChild(txt);
    return element;
}

function create_rect() {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    element.setAttribute('x', '200');
    element.setAttribute('y', '200');
    element.setAttribute('width', '600');
    element.setAttribute('height', '100');
    element.setAttribute('stroke', 'black');
    element.setAttribute('stroke-width', '3');
    element.setAttribute('fill', 'rgb(0,0,255)');
    return element;
}

function create_circle() {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    element.setAttribute('cx', '850');
    element.setAttribute('cy', '250');
    element.setAttribute('r', '40');
    element.setAttribute('stroke', 'green');
    element.setAttribute('stroke-width', '4');
    element.setAttribute('fill', 'red');
    return element;
}
