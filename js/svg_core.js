const SVG_NS = 'http://www.w3.org/2000/svg';

function svg_el(el_name, attribs) {
    var element = document.createElementNS(SVG_NS, el_name);

    if (attribs !== undefined) {
        attrib_set(element, attribs);
    }

    return element;
}

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
    const element = svg_el('circle', attribs);
    element.setAttribute('cx', cx);
    element.setAttribute('cy', cy);
    element.setAttribute('r', r);

    return element;
}

function svg_path(d, attribs) {
    const element = svg_el('path', attribs);
    element.setAttribute('d', d);

    return element;
}

function svg_group(attribs) {
    const element = svg_el('g', attribs);

    return element;
}

function svg_rect(x, y, w, h, attribs) {
    const element = svg_el('rect', attribs);
    element.setAttribute('x', x);
    element.setAttribute('y', y);
    element.setAttribute('width', w);
    element.setAttribute('height', h);

    return element;
}

function svg_polygon(points, attribs) {
    const element = svg_el('polygon', attribs);
    element.setAttribute('points', points);

    return element;
}

function svg_line(x1, y1, x2, y2, stroke_color, attribs) {
    const element = svg_el('line', attribs);
    element.setAttribute('x1', x1.toString());
    element.setAttribute('y1', y1.toString());
    element.setAttribute('x2', x2.toString());
    element.setAttribute('y2', y2.toString());
    element.setAttribute('stroke', stroke_color);

    return element;
}