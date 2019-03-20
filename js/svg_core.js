const SVG_NS = 'http://www.w3.org/2000/svg';

function gen_side_arc1c(height, sweep, negative) {
    const h = height.toString();
    const hh = (height / 2).toString();

    rv_neg = negative ? '-' : '';
    sweep_flag = sweep ? '1' : '0';

    const arc1 = 'a30,' + hh + ' 0 1,' + sweep_flag + ' 0,' + rv_neg + h;
    return arc1;
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

function svg_rect(x, y, w, h, attribs) {
    var element = document.createElementNS(SVG_NS, 'rect');
    element.setAttribute('x', x);
    element.setAttribute('y', y);
    element.setAttribute('width', w);
    element.setAttribute('height', h);

    if (attribs !== undefined) {
        attrib_set(element, attribs);
    }

    return element;
}

function svg_polygon(points, attribs) {
    var element = document.createElementNS(SVG_NS, 'polygon');
    element.setAttribute('points', points);

    if (attribs !== undefined) {
        attrib_set(element, attribs);
    }

    return element;
}
