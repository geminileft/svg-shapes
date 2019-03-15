function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function vector_from_points(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const vec_length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    const unit_vec_x = dx / vec_length;
    const unit_vec_y = dy / vec_length;
    return [dx, dy, unit_vec_x, unit_vec_y, -unit_vec_x, unit_vec_y, unit_vec_x, -unit_vec_y];
}

function point_on_circle_x(width, start_angle) {
    const circle_x = (width * Math.cos(toRadians(start_angle)));
    return circle_x;
}

function point_on_circle_y(width, start_angle) {
    const circle_y = (width * -1 * Math.sin(toRadians(start_angle)));
    return circle_y;
}
