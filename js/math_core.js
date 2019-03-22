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

function circle_points(width, start_angle, end_angle) {
    const half_angle_delta = (end_angle - start_angle) / 2;

    const start_x = point_on_circle_x(width, start_angle);
    const start_y = point_on_circle_y(width, start_angle);

    const arc_mid_x = point_on_circle_x(width, start_angle + half_angle_delta);
    const arc_mid_y = point_on_circle_y(width, start_angle + half_angle_delta);

    const end_x = point_on_circle_x(width, end_angle);
    const end_y = point_on_circle_y(width, end_angle);

    return [start_x, start_y, arc_mid_x, arc_mid_y, end_x, end_y];
}