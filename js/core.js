const SVG_NS = 'http://www.w3.org/2000/svg';

function gen_side_arc1c(height, sweep, negative) {
    const h = height.toString();
    const hh = (height / 2).toString();

    rv_neg = negative ? '-' : '';
    sweep_flag = sweep ? '1' : '0';

    const arc1 = 'a30,' + hh + ' 0 1,' + sweep_flag + ' 0,' + rv_neg + h;
    return arc1;
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

function attrib_set(e, attribs) {
    for (var att in attribs) {
        e.setAttribute(att, attribs[att]);
    }
}

function svg_circle(cx, cy, r, attribs) {
    var element = document.createElementNS(SVG_NS, 'circle');
    element.setAttribute('cx', cx);
    element.setAttribute('cy', cy);
    element.setAttribute('r', r);

    if (attribs !== undefined) {
        attrib_set(element, attribs);
    }

    return element;
}

function svg_path(d, attribs) {
    var element = document.createElementNS(SVG_NS, 'path');
    element.setAttribute('d', d);

    if (attribs !== undefined) {
        attrib_set(element, attribs);
    }

    return element;
}

function svg_group(attribs) {
    var element = document.createElementNS(SVG_NS, 'g');

    if (attribs !== undefined) {
        attrib_set(element, attribs);
    }

    return element;
}